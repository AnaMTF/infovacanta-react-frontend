import React from "react";
import Axios from "axios";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Review } from "./Main";

import { Tab, Tabs } from "react-bootstrap";

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
    <Tabs defaultKey="reviews" id="uncontrolled-tab-example">
      <Tab eventKey="reviews" title="Recenzii" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {query_results?.reviews.map((review, idx) => {
              return (
                <Review loggedInUserId={user?.user_id} key={idx} content={review}></Review>
              );
            })}
          </ul>
        </div>
      </Tab>

      <Tab eventKey="destinations" title="Stațiuni" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {query_results?.destinations.map((destination, idx) => {
              return (
                <div className="card">
                  <img src={destination.location} className="card-img-top" alt="Mamaia" />
                  <div className="card-body">
                    <h5 className="card-title">{destination.destination_name}</h5>
                    <small>{destination.destination_category}</small>
                    <p className="card-text">{destination.description}</p>
                    <Link to={destination.destination_link}>
                      <button className="btn btn-primary">Mai multe detalii</button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </Tab>

      <Tab eventKey="comments" title="Comentarii" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {query_results?.comments.map((comment, idx) => {
              return (
                <div key={idx} className="list-group-item list-group-item-action" id="postsItems">
                  <small>{comment.nickname} a comentat la data de {comment.date_posted}:</small>
                  <p>{comment.content}</p>
                </div>
              );
            })}
          </ul>
        </div>
      </Tab>
    </Tabs>
  );
};