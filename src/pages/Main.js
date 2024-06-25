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

import { fetchAllComments, fetchAllReviews } from '../utils/fetchFunctions.js';

export const Main = () => {
  const user = useSelector((state) => state.user.user);

  const { data: reviews } = useQuery(["Review Cards"], async () => fetchAllReviews());

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
          return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
        })}
      </ul>
    </div>
  );
};