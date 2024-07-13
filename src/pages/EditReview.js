import Axios from 'axios';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RateButton } from '@lyket/react';
import { useSelector } from 'react-redux';

import "../css/styles.css";
import "../css/header.css";
import "../css/new.css";
import { fetchDestinations } from '../utils/fetchFunctions';

import { updateRating } from '../utils/databaseFunctions';

export const EditReview = (props) => {
  const user = useSelector((state) => state.user.user);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();

  const [reviewBody, setReviewBody] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [review_picture, setReviewPicture] = useState(null);

  const { data: destinations } = useQuery(["Destinations"], async () => fetchDestinations());
  const { data: reviewBasicInfo, isLoading: reviewIsLoading } = useQuery(["Review for Edit", reviewId], async function () {
    try {
      const response = await Axios.get(`https://localhost:5000/reviews/${reviewId}/basic`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (reviewBasicInfo) {
      console.log("Fetched review info:", reviewBasicInfo); // Debug log
      reviewBasicInfo.map((review) => {
        setReviewBody(review.review_body);
        setDestinationName(review.destination_name);
      });
    }
  }, [reviewBasicInfo]);

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Review body:", reviewBody);
    console.log("Destination name:", destinationName);

    const params = new FormData();
    params.append("review_body", reviewBody);
    // params.append("review_category", ""); //<-- determinat pe partea de backend
    params.append("destination_name", destinationName);
    params.append("date_posted", new Date().toISOString());
    //params.append("destination_id", ""); //<-- determinat pe partea de backend
    //params.append("author_id", user.user_id);

    if (review_picture) {
      params.append("review_picture", review_picture);
    }

    try {
      await Axios.put(`https://localhost:5000/reviews/${reviewId}`, params, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      queryClient.refetchQueries(["Review Cards"]);
      navigate(-1);
    }
  };

  if (reviewIsLoading) return (<div className="container jumbotron centered"><h1>Se încarcă...</h1></div>);

  return (
    <div className="container jumbotron centered">
      <h1>Modificați recenzia</h1>

      <form id="newPostForm" onSubmit={(e) => handleSubmit(e, navigate)}>
        <input
          type="text" name="destination_name"
          placeholder="Destinația turistică vizitată"
          required
          list="destination_names"
          value={destinationName}
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
          value={reviewBody}
          onChange={(e) => setReviewBody(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="review_picture"
          onChange={(e) => setReviewPicture(e.target.files[0])}
        />

        <RateButton className="list-group-item"
          // namespace="infovacanta-react"
          // id={`review-${reviewId}`}
          // id="review-test"
          showRating="user"
          onPress={() => updateRating(reviewId)}
        />

        <button className="full-width" type="submit" id="publicaBtn">Publică</button>
      </form>



      <Link to="/main">
        <button className="full-width" id="cancelBtn">Anulează</button>
      </Link>
    </div>
  );
};