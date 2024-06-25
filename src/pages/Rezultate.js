import React from "react";
import Axios from "axios";

import { useState } from "react";

import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Review } from "../components/Review";

import { Tab, Tabs, Card, Button } from "react-bootstrap";

import default_picture from "../resources/blank-profile-pic.png";
import banner from "../resources/banner.png";

import { useEffect } from "react";

import { AllCommentsModal } from "../components/AllCommentsModal";

import "../css/styles.css";
import "../css/header.css";
import { fetchAllComments, fetchQueryResultsByKeyword } from "../utils/fetchFunctions";
// import "../css/main.css";

export const Rezultate = (props) => {

  useLocation();

  const { keyword } = useParams();

  const user = useSelector((state) => state.user.user);
  const search = useSelector((state) => state.search.filters);

  const [showReviews, setShowReviews] = useState(search.searchInReviews);
  const [showDestinations, setShowDestinations] = useState(search.searchInDestinations);
  const [showComments, setShowComments] = useState(search.searchInComments);
  const [showUsers, setShowUsers] = useState(search.searchInUsers);

  useEffect(() => {
    console.log("REDUX STATE:\n", search);

    setShowReviews(search.searchInReviews);
    setShowDestinations(search.searchInDestinations);
    setShowComments(search.searchInComments);
    setShowUsers(search.searchInUsers);

  }, [search]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: query_results, isLoading, isError } = useQuery(["Query Results", keyword], async () => fetchQueryResultsByKeyword(keyword));

  // const { data: reviews, isLoading, error } = useQuery(["reviews"], async () => {
  //   const result = await Axios.get("http://localhost:5000/reviews");
  //   return result.data;
  // });

  return (
    <Tabs defaultKey="reviews" id="uncontrolled-tab-example"
      style={{ backgroundColor: "#E6D1F2", color: "red" }}
    >
      {showReviews && <Tab eventKey="reviews" title="Recenzii" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {query_results?.reviews.map((review, idx) => {
              const comments = allComments?.filter(comment => comment.review_id == review.review_id);
              const showComments = showCommentsHashMap[review.review_id] || false;

              if (search.minDate) {
                if (new Date(review.date_posted) < new Date(search.minDate)) {
                  return null;
                }
              }

              if (search.maxDate) {
                if (new Date(review.date_posted) > new Date(search.maxDate)) {
                  return null;
                }
              }

              if (search.isBeachDestination == false) {
                if (review.destination_category.includes("mare")) {
                  return null;
                }
              }

              if (search.isMountainDestination == false) {
                if (review.destination_category.includes("munte")) {
                  return null;
                }
              }

              if (search.isThermalSpringDestination == false) {
                if (review.destination_category.includes("balnear")) {
                  return null;
                }
              }

              return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
            })}
          </ul>
        </div>
      </Tab>}

      {showDestinations && <Tab eventKey="destinations" title="Stațiuni" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group" >
            {query_results?.destinations.map((destination, idx) => {
              return (
                <div className="card" key={idx} style={{
                  marginBottom: "30px",
                }}>
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
      </Tab>}

      {showComments && <Tab eventKey="comments" title="Comentarii" style={{ borderRadius: "unset" }}>
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
      </Tab>}

      {showUsers && <Tab eventKey="users" title="Utilizatori" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {query_results?.users.map((user, idx) => {
              return (
                <Card style={{ position: 'relative', marginBottom: "30px" }}>
                  <Card.Img variant="bottom" src={banner} alt="User cover" />
                  <div style={{ position: 'absolute', top: '20%', left: '12.5%', transform: 'translate(-50%, -50%)' }}>
                    <Card.Img src={user.pfp_location || default_picture} alt="User profile" style={{ height: "120px", width: "120px" }} />
                  </div>

                  <Card.Body>
                    <Card.Title >Nickname: <b>{user.nickname}</b></Card.Title>
                    <Card.Subtitle>Nume: <b>{user.full_name}</b></Card.Subtitle>

                    <Card.Text>
                      <small>Email: <b>{user.email}</b></small>
                    </Card.Text>

                    <Link to={`/profil/${user.user_id}`}>
                      <Button variant="primary">View Profile</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
          </ul>
        </div>
      </Tab>}
    </Tabs>
  );
};