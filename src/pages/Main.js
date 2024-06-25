import React, { Component, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from "axios";

import { useSelector } from 'react-redux';
import { logoutUser } from '../app/userSlice';

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";
import "../css/savebuttons.css";

import { Link } from "react-router-dom";

import { AllCommentsModal } from "../components/AllCommentsModal";


// import Chatbot from '../components/Chatbot';


import "@fortawesome/fontawesome-free/css/all.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import "@fortawesome/fontawesome-free";

import { Review } from '../components/Review';

export const Main = () => {
  const user = useSelector((state) => state.user.user);

  const [showCommentsHashMap, setShowCommentsHashMap] = React.useState({});
  const toggleShowComments = function (review_id) {
    setShowCommentsHashMap(prevState => ({
      ...prevState,
      [review_id]: !prevState[review_id]
    }));
  };

  const { data: reviews } = useQuery(["review_id"], async function () {
    try {
      const result = await Axios.get("http://localhost:5000/review-cards");
      //console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const { data: allComments } = useQuery(["comment_id"], async function () {
    try {
      const result = await Axios.get(`http://localhost:5000/comments`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";

    const script2 = document.createElement('script');
    script2.src = "https://mediafiles.botpress.cloud/9b63b3fc-f11f-4a11-a8f4-a72b5bbdfcfe/webchat/v2/config.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    }
  }, []);

  return (
    <div className="container-fluid jumbotron centered">
      <h1>InfoVacanță</h1>
      <Link to="/new">
        <button id="newPostBtn">Recenzie Nouă</button>
      </Link>

      <ul id="postsList" className="list-group">
        {reviews?.map((review, idx) => {
          const comments = allComments?.filter(comment => comment.review_id == review.review_id);
          const showComments = showCommentsHashMap[review.review_id] || false;

          //console.log("Comments for review", review.review_id, comments)

          return (
            <div key={idx}>
              <Review
                loggedInUserId={user?.user_id}
                content={review}
                toggleShowComments={toggleShowComments}
              ></Review>
              <AllCommentsModal
                content={comments}
                show={showComments} onHide={() => toggleShowComments(review.review_id)}
              ></AllCommentsModal>
            </div>
          );
        })}
      </ul>
    </div>
  );
};