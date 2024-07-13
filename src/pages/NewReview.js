import Axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useState } from 'react'

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { RateButton } from '@lyket/react';

import { useSelector } from 'react-redux';

import "../css/styles.css";
import "../css/header.css";
import "../css/new.css";
import "../css/review.css";

import { fetchDestinations, fetchNextReviewId } from '../utils/fetchFunctions';
import { updateRating } from '../utils/databaseFunctions';

export const NewReview = (props) => {
  const user = useSelector((state) => state.user.user);

  const [review_body, setReviewBody] = useState('');
  const [destination_name, setDestinationName] = useState('');
  const [review_picture, setReviewPicture] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { data: destinations } = useQuery(["Destinations"], async () => fetchDestinations());
  const { data: newReviewId } = useQuery(["Next Review ID"], async () => fetchNextReviewId());

  const queryClient = useQueryClient();

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Review body:", review_body);
    console.log("Destination name:", destination_name);

    const params = new FormData();
    params.append("review_body", review_body);
    // params.append("review_category", ""); //<-- determinat pe partea de backend
    params.append("destination_name", destination_name);
    params.append("date_posted", new Date().toISOString());
    //params.append("destination_id", ""); //<-- determinat pe partea de backend
    params.append("author_id", user.user_id);

    if (review_picture) {
      params.append("review_picture", review_picture);
    }

    try {
      await Axios.post("https://localhost:5000/reviews", params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      updateRating(parseInt(newReviewId.nextval) + 1);
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.refetchQueries(["Review Cards"]);
      navigate(-1);
    }
  };

  return (
    <div className="container jumbotron centered">
      <h1>Recenzie nouă</h1>
      <form id="newPostForm" onSubmit={(e) => handleSubmit(e, navigate)}>
        <input
          type="text" name="destination_name"
          placeholder="Destinația turistică vizitată"
          required
          list="destination_names"
          value={destination_name}
          onChange={(e) => setDestinationName(e.target.value)}
        />
        <datalist id="destination_names">
          {destinations?.map((destination, idx) => {
            return (
              <option key={idx} value={destination.destination_name} />
            );
          })}
        </datalist>
        <textarea
          name="review_body"
          placeholder="Scrieți recenzia dumneavoastră aici..."
          required
          rows="10"
          value={review_body}
          onChange={(e) => setReviewBody(e.target.value)}
        ></textarea>
        <div className='review_picture'>
          <input
            type="file"
            name="review_picture"
            onChange={(e) => setReviewPicture(e.target.files[0])}
          />
        </div>
        {
          newReviewId?.map((newid, idx) => {
            return (
              <RateButton key={idx} className="list-group-item starRating"
                namespace="infovacanta-react"
                id={`review-${parseInt(newid.nextval) + 1}`}
                // id="review-test"
                showRating="user"
              // onPress={() => updateRating(parseInt(newid.nextval) + 1)}
              />
            );
          })
        }

        <button className="full-width" type="submit" id="publicaBtn">Publică</button>
      </form>


      <Link to="/main">
        <button className="full-width" id="cancelBtn">Anulează</button>
      </Link>
    </div>
  );
};