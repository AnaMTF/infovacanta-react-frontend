import Axios from 'axios';

import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RateButton } from '@lyket/react';
import { useSelector } from 'react-redux';

import "../css/styles.css";
import "../css/header.css";
import "../css/new.css";

export const EditReview = (props) => {
  const user = useSelector((state) => state.user.user);
  const { reviewId } = useParams();
  const navigate = useNavigate();

  const [reviewBody, setReviewBody] = useState('');
  const [destinationName, setDestinationName] = useState('');

  const { data: destinations } = useQuery(["destination_id"], async function () {
    try {
      const response = await Axios.get(`http://localhost:5000/destinations`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });

  const { data: reviewBasicInfo, isLoading: reviewIsLoading } = useQuery(["review_id"], async function () {
    try {
      const response = await Axios.get(`http://localhost:5000/reviews/${reviewId}/basic`);
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
    console.log("Review body:", review_body);
    console.log("Destination name:", destination_name);

    const params = new URLSearchParams();
    params.append("review_body", review_body);
    // params.append("review_category", ""); //<-- determinat pe partea de backend
    params.append("destination_name", destination_name);
    params.append("date_posted", new Date().toISOString());
    //params.append("destination_id", ""); //<-- determinat pe partea de backend
    params.append("author_id", user.user_id);

    try {
      await Axios.post("http://localhost:5000/reviews", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/main");
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
        <RateButton className="list-group-item"
          namespace="infovacanta-react"
          id={`review-${reviewId}`}
          //id="review-test"
          showRating="user"
        />

        <button className="full-width" type="submit" id="publicaBtn">Publică</button>
      </form>



      <Link to="/main">
        <button className="full-width" id="cancelBtn">Anulează</button>
      </Link>
    </div>
  );
};