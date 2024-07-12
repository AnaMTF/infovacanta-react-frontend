import React from "react";
import { useState, useEffect } from "react";

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";

import Axios from "axios";

import { Review } from "../components/Review";
import { AllCommentsModal } from "../components/AllCommentsModal";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchAllComments, fetchAllReviews } from "../utils/fetchFunctions";

import { useInView } from 'react-intersection-observer';
import { useGeolocation } from "@uidotdev/usehooks";

import getDistanceFromLatLonInKm from '../utils/trigonometryFunctions.js';

export const SavedReviews = () => {
  const sortType = useSelector((state) => state.sortType.value);
  const geolocation = useGeolocation();

  const user = useSelector((state) => state.user.user);
  const { data: reviews } = useQuery(["Review Cards"], async () => fetchAllReviews());

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [nextBatch, setNextBatch] = useState(0);
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && nextBatch < reviews.length) {
      const batchSize = 1; // Number of reviews to load per batch
      const newBatch = reviews.slice(nextBatch, nextBatch + batchSize);
      setVisibleReviews(prev => [...prev, ...newBatch]);
      setNextBatch(nextBatch + batchSize);
    }
  }, [inView, nextBatch, reviews]);

  return (
    <div className="container-fluid jumbotron centered">
      <h1>Recenzii salvate</h1>
      <ul id="postsList" className="list-group">
        {visibleReviews?.sort((a, b) => {
          switch (sortType) {
            case 'newest_first':
              return new Date(b.date_posted) - new Date(a.date_posted);
            case 'most_upvotes':
              return b.upvotes - a.upvotes;
            case 'best_rating':
              return b.rating - a.rating;
            case 'closest':
              const distanceA = getDistanceFromLatLonInKm(a.lat, a.lon, geolocation.latitude, geolocation.longitude);
              const distanceB = getDistanceFromLatLonInKm(b.lat, b.lon, geolocation.latitude, geolocation.longitude);
              return distanceA - distanceB;
          }
        }).filter((review) => user?.saved_reviews.includes(review.review_id)).map((review, idx) => {
          return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
        })}

        {nextBatch < reviews?.length && (
          <div ref={ref}>
            <h1>Se încarcă mai multe recenzii...</h1>
          </div>
        )}
      </ul>
    </div>
  );
};