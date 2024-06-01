import React, { Component } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";


function Review(props) {
  return (<li className="list-group-item list-group-item-action" id="postsItems">
    <h2>{props.content.destination_name}</h2>
    <small>{props.content.destination_category}</small>
    <p>{props.content.review_body}</p>
    <small>By: {props.content.nickname}</small>
    <small>Date posted: {props.content.date_posted}</small>
    <div id="starRating" data-lyket-type="rate" data-lyket-id="my-<%=review.reviewid%>-post" data-lyket-show-rating="average"></div>
    <div className="lyket-counter" data-lyket-type="updown" data-lyket-id="my-<%=i%>-post" data-lyket-namespace="blog" data-lyket-template="simple"></div>
    <a className="edit" href="/modify/<%=review.reviewid%>">Editează</a>
    <a className="delete" href="/reviews/delete/<%=review.reviewid%>">Șterge</a>
    <a className="comment" href="">Lasă un comentariu</a>
  </li>);
}


export const Main = () => {
  const { data: reviews } = useQuery(["review_id"], async function () {
    try {
      const result = await Axios.get("http://localhost:5000/reviews");
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
    <body>
      <div className="container-fluid jumbotron centered">
        <h1>InfoVacanță</h1>
        <a id="newPostBtn" href="/new">Recenzie Nouă</a> {/* <-- de transformat in LINK component*/}
        <a id="logoutBtn" href="/logout">Logout</a>
        <ul id="postsList" className="list-group">
          {reviews?.map((review, idx) => {
            return (
              <Review content={review}></Review>
            );
          })}
        </ul>
      </div>
    </body>
  );
};