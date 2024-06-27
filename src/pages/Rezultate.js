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

import "../css/styles.css";
import "../css/header.css";
import { fetchQueryResultsByKeyword } from "../utils/fetchFunctions";
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
    //console.log("REDUX STATE:\n", search);

    setShowReviews(search.searchInReviews);
    setShowDestinations(search.searchInDestinations);
    setShowComments(search.searchInComments);
    setShowUsers(search.searchInUsers);

  }, [search]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: query_results, isLoading, isError } = useQuery(["Query Results", keyword], async () => fetchQueryResultsByKeyword(keyword));

  return (
    <Tabs defaultKey="reviews" id="uncontrolled-tab-example"
      style={{ backgroundColor: "#E6D1F2" }}
    >
      {showReviews && <Tab eventKey="reviews" title="Recenzii" className="uncontrolled-tab-example" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {query_results?.reviews.map((review, idx) => {
              let num_likes = 0;

              Axios.get(`https://api.lyket.dev/v1/like-buttons/infovacanta-react/review-upvotes-${review.review_id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer pt_49ef1b9862ddcdc97d841106b33e79`
                }
              })
                .then((response) => {
                  num_likes = response.data.data.attributes.total_likes;
                  console.log(`Post ID ${review.review_id} has ${num_likes} likes`);
                  //console.log("Response data: ", typeof response.data.data.attributes.total_likes);
                })
                .catch((error) => { console.error("An error has occured...") });
              // const result = await Axios.get(`https://api.lyket.dev/v1/like-buttons/infovacanta-react/review-${review.review_id}`);
              // const num_likes = result.data?.total_likes;

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

              console.log("Number of likes: ", num_likes);
              console.log("Minimum likes: ", search.minRatings);

              if (num_likes < search.minRatings) {
                return null;
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
                      <button className="btn btn-primary buton-statiuni">
                        <i className="fa-solid fa-circle-info" style={{
                          marginRight: "6px"
                        }} />Mai multe detalii</button>
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
                      <Button variant="primary" className="buton-statiuni">
                        <i class="fa-regular fa-user" style={{
                          marginRight: "6px"
                        }}></i>
                        Vedeți profilul</Button>
                    </Link>
                  </Card.Body>
                </Card>
              );
            })}
          </ul>
        </div>
      </Tab>}
    </Tabs >
  );
};