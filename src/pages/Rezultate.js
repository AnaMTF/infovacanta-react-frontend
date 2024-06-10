import React from "react";
import Axios from "axios";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Review } from "./Main";

export const Rezultate = () => {
  const { keyword } = useParams();

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: query_results, isLoading, isError } = useQuery(["review_id"], async function () {
    try {
      const result = await Axios.get(`http://localhost:5000/query/${keyword}`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // const { data: reviews, isLoading, error } = useQuery(["reviews"], async () => {
  //   const result = await Axios.get("http://localhost:5000/reviews");
  //   return result.data;
  // });

  return (
    <div className="container-fluid jumbotron centered">
      <h1>InfoVacanță</h1>
      <Link to="/new">
        <button id="newPostBtn">Recenzie Nouă</button>
      </Link>
      <Link to="/profil">
        <button id="newPostBtn">Profil ({user?.nickname || "no user detected"})</button>
      </Link>
      <Link to="/">
        <button id="logoutBtn" onClick={() => dispatch(logoutUser(navigate))}>Logout</button>
      </Link>

      <ul id="postsList" className="list-group">
        {query_results?.reviews.map((review, idx) => {
          return (
            <Review loggedInUserId={user?.user_id} key={idx} content={review}></Review>
          );
        })}
      </ul>
    </div>
  );
};