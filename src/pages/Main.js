import React, { Component } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";

import { Link } from "react-router-dom";

export function Review(props) {

  const deleteReview = async function (reviewId) {
    console.log("delete review with id:", reviewId);
    try {
      await Axios.delete(`http://localhost:5000/reviews/${reviewId}`);
      console.log("Review deleted");
    } catch (error) {
      console.error(error);
    }
  }

  const editReview = async function (reviewId) {
    console.log("edit review with id:", reviewId);
  }

  const commentReview = async function (reviewId) {
    console.log("comment on review with id:", reviewId);
  }

  return (<li className="list-group-item list-group-item-action" id="postsItems">
    <h2>{props.content.destination_name}</h2>
    <small>{props.content.destination_category}</small>
    <p>{props.content.review_body}</p>
    <small>By: {props.content.nickname}</small>
    <small>Date posted: {props.content.date_posted}</small>
    <div id="starRating" data-lyket-type="rate" data-lyket-id={`my-${props.content.review_id}-post`} data-lyket-show-rating="average"></div>
    <div className="lyket-counter" data-lyket-type="updown" data-lyket-id="my-<%=i%>-post" data-lyket-namespace="blog" data-lyket-template="simple"></div>
    {
      props.loggedInUserId == props.content.author_id &&
      <Link to="">
        <button className="edit">Editează</button>
      </Link>
    }
    {
      props.loggedInUserId == props.content.author_id &&
      <button className="delete">Șterge</button>
    }
    <Link to="">
      <button className="comment">Lasă un comentariu</button>
    </Link>
  </li>);
}


export const Main = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: reviews } = useQuery(["review_id"], async function () {
    try {
      const result = await Axios.get("http://localhost:5000/reviews");
      //console.log(result.data);
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
        {reviews?.map((review, idx) => {
          return (
            <Review loggedInUserId={user?.user_id} key={idx} content={review}></Review>
          );
        })}
      </ul>
    </div>
  );
};