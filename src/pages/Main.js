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

export const Main = () => {
  const user = useSelector((state) => state.user.user);

  const { data: reviews } = useQuery(["Review Cards"], async () => fetchAllReviews());

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [nextBatch, setNextBatch] = useState(0);
  const { ref, inView } = useInView({
    threshold: 1,
  });

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
        {visibleReviews.map((review, idx) => {
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