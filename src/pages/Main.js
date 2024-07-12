import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";
import "../css/savebuttons.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { Review } from '../components/Review';
import { fetchAllReviews } from '../utils/fetchFunctions.js';
import { useInView } from 'react-intersection-observer';
import { useGeolocation } from '@uidotdev/usehooks';

import getDistanceFromLatLonInKm from '../utils/trigonometryFunctions.js';

export const Main = () => {
  const user = useSelector((state) => state.user.user);

  const sortType = useSelector((state) => state.sortType.value);
  const { data: reviews } = useQuery(["Review Cards"], async () => fetchAllReviews());

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [nextBatch, setNextBatch] = useState(0);
  const { ref, inView } = useInView({
    threshold: 1,
  });

  const geolocation = useGeolocation();

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";


    const script2 = document.createElement('script');
    script2.src = "https://mediafiles.botpress.cloud/9b63b3fc-f11f-4a11-a8f4-a72b5bbdfcfe/webchat/config.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    }
  }, []);

  useEffect(() => {
    if (inView && nextBatch < reviews.length) {
      const batchSize = 1; // Number of reviews to load per batch
      const newBatch = reviews.slice(nextBatch, nextBatch + batchSize);
      setVisibleReviews(prev => [...prev, ...newBatch]);

      // // aplicare sortare
      // console.log("Sort type", sortType);
      // switch (sortType) {
      //   case 'newest_first':
      //     setVisibleReviews(visibleReviews.reverse());
      //     break;
      //   case 'most_upvotes':
      //     setVisibleReviews(visibleReviews.sort((a, b) => b.upvotes - a.upvotes));
      //     break;
      //   case 'best_rating':
      //     setVisibleReviews(visibleReviews.sort((a, b) => b.rating - a.rating));
      //     break;
      //   case 'closest':
      //     setVisibleReviews(visibleReviews.sort((a, b) => {
      //       const distanceA = getDistanceFromLatLonInKm(a.lat, a.lon, geolocation.latitude, geolocation.longitude);
      //       const distanceB = getDistanceFromLatLonInKm(b.lat, b.lon, geolocation.latitude, geolocation.longitude);
      //       return distanceA - distanceB;
      //     }));
      //     break;
      // }

      setNextBatch(nextBatch + batchSize);
    }
  }, [inView, nextBatch, reviews]);

  return (
    <div className="container-fluid jumbotron centered">
      <h1>InfoVacanță</h1>
      <Link to="/new">
        <button id="newPostBtn">Recenzie Nouă</button>
      </Link>

      <ul id="postsList" className="list-group">
        {visibleReviews
          // .sort((a, b) => {
          //   switch (sortType) {
          //     case 'newest_first':
          //       return new Date(b.date_posted) - new Date(a.date_posted);
          //     case 'most_upvotes':
          //       return b.upvotes - a.upvotes;
          //     case 'best_rating':
          //       return b.rating - a.rating;
          //     case 'closest':
          //       const distanceA = getDistanceFromLatLonInKm(a.lat, a.lon, geolocation.latitude, geolocation.longitude);
          //       const distanceB = getDistanceFromLatLonInKm(b.lat, b.lon, geolocation.latitude, geolocation.longitude);
          //       return distanceA - distanceB;
          //   }
          // })
          .map((review, idx) => {
            return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
          })}
      </ul>

      {nextBatch < reviews?.length && (
        <div ref={ref}>
          <h1>Se încarcă mai multe recenzii...</h1>
        </div>
      )}
    </div>
  );
};