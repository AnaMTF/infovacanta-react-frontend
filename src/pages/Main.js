import React, { Component } from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";

export const Main = () => {
  return (
    <body>
      <div class="container-fluid jumbotron centered">
        <h1>InfoVacanță</h1>
        <a id="newPostBtn" href="/new">Recenzie Nouă</a>
        <a id="logoutBtn" href="/logout">Logout</a>
        <ul id="postsList" class="list-group">
          {/* <% var i = 0; %>
                
                <% reviews.forEach(review => { %> */}
          <li class="list-group-item list-group-item-action" id="postsItems">
            <h2>DESTINATION NAME</h2>
            <small>DESTINATION CATEGORY</small>
            <p>REVIEW BODY</p>
            <small>By: AUTHOR NICKNAME</small>
            <small>Date posted: DATE POSTED</small>
            <div id="starRating" data-lyket-type="rate" data-lyket-id="my-<%=review.reviewid%>-post" data-lyket-show-rating="average"></div>
            <div class="lyket-counter"
              data-lyket-type="updown"
              data-lyket-id="my-<%=i%>-post"
              data-lyket-namespace="blog"
              data-lyket-template="simple"></div>
            <a class="edit" href="/modify/<%=review.reviewid%>">Editează</a>
            <a class="delete" href="/reviews/delete/<%=review.reviewid%>">Șterge</a>
            <a class="comment" href="">Lasă un comentariu</a>
          </li>
        </ul>
      </div>
    </body>
  );
};