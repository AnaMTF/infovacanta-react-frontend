import React from "react";
import Axios from "axios";

import { useState, useEffect } from "react";

import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Review } from "../components/Review";

import { Tab, Tabs, Card, Button } from "react-bootstrap";

import default_picture from "../resources/blank-profile-pic.png";
import banner from "../resources/banner.png";

import "../css/styles.css";
import "../css/header.css";
import { fetchQueryResultsByKeyword } from "../utils/fetchFunctions";
// import "../css/main.css";

import { useInView } from 'react-intersection-observer';
import getDistanceFromLatLonInKm from "../utils/trigonometryFunctions";
import { useGeolocation } from "@uidotdev/usehooks";

export const Rezultate = (props) => {

  useLocation();

  const { keyword } = useParams();

  const user = useSelector((state) => state.user.user);
  const search = useSelector((state) => state.search.filters);
  // const poz = useSelector((state) => state.myPosition);
  // const poz = useGeolocation();
  const geolocation = useGeolocation();

  const [showReviews, setShowReviews] = useState(search.searchInReviews);
  const [showDestinations, setShowDestinations] = useState(search.searchInDestinations);
  const [showComments, setShowComments] = useState(search.searchInComments);
  const [showUsers, setShowUsers] = useState(search.searchInUsers);

  const [geolocation_state, setGeolocationState] = useState(null);

  useEffect(() => {
    setGeolocationState(geolocation);
  }, [geolocation, geolocation.latitude, geolocation.longitude, geolocation.error, geolocation.loading]);

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

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [nextBatch, setNextBatch] = useState(0);
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && nextBatch < query_results?.reviews.length) {
      const batchSize = 1; // Number of reviews to load per batch
      const newBatch = query_results?.reviews.slice(nextBatch, nextBatch + batchSize);
      setVisibleReviews(prev => [...prev, ...newBatch]);
      setNextBatch(nextBatch + batchSize);
    }
  }, [inView, nextBatch, query_results?.reviews]);

  const [visibleComments, setVisibleComments] = useState([]);
  const [nextBatchComments, setNextBatchComments] = useState(0);
  const { ref: refComments, inView: inViewComments } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inViewComments && nextBatchComments < query_results?.comments.length) {
      const batchSize = 1; // Number of comments to load per batch
      const newBatch = query_results?.comments.slice(nextBatchComments, nextBatchComments + batchSize);
      setVisibleComments(prev => [...prev, ...newBatch]);
      setNextBatchComments(nextBatchComments + batchSize);
    }

    console.log("all comments:", query_results?.comments);
    console.log("visible comments:", visibleComments);
  }, [inViewComments, nextBatchComments, query_results?.comments]);

  // useEffect(() => {
  //   console.log("poz:", poz);
  // }, [poz]);

  return (
    <Tabs defaultKey="reviews" id="uncontrolled-tab-example"
      style={{ backgroundColor: "#E6D1F2" }}
    >
      {showReviews && <Tab eventKey="reviews" title="Recenzii" className="uncontrolled-tab-example" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group">
            {visibleReviews.map((review, idx) => {
              // let num_likes = 0;

              // LYKET API
              // Axios.get(`https://api.lyket.dev/v1/like-buttons/infovacanta-react/review-upvotes-${review.review_id}`, {
              //   headers: {
              //     'Content-Type': 'application/json',
              //     'Authorization': `Bearer pt_49ef1b9862ddcdc97d841106b33e79`
              //   }
              // })
              //   .then((response) => {
              //     num_likes = response.data.data.attributes.total_likes;
              //     console.log(`Post ID ${review.review_id} has ${num_likes} likes`);
              //     //console.log("Response data: ", typeof response.data.data.attributes.total_likes);
              //   })
              //   .catch((error) => { console.error("An error has occured...") });
              // const result = await Axios.get(`https://api.lyket.dev/v1/like-buttons/infovacanta-react/review-${review.review_id}`);
              // const num_likes = result.data?.total_likes;

              const num_likes = review.upvotes;
              const num_stars = review.rating;
              const distance = getDistanceFromLatLonInKm(geolocation_state.latitude, geolocation_state.longitude, review.lat, review.lon);

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

              // console.log("Number of likes: ", num_likes);
              // console.log("Minimum likes: ", search.minRatings);

              if (num_likes < search.minRatings) {
                return null;
              }

              if (num_stars < search.minStars) {
                return null;
              }

              if (distance > search.maxDistance) { // scuze ma cam doare capul
                // console.log("User location: ", geolocation_state.latitude, geolocation_state.longitude)
                // console.log("Review location: ", review.lat, review.lon);
                // console.log("Distance: ", distance);
                // console.log("Max distance: ", search.maxDistance);
                return null;
              }

              return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
            })}
          </ul>

          {nextBatch < query_results?.reviews?.length && (
            <div ref={ref}>
              <h1>Se încarcă mai multe recenzii...</h1>
            </div>
          )}
        </div>
      </Tab>}

      {showDestinations && <Tab eventKey="destinations" title="Stațiuni" style={{ borderRadius: "unset" }}>
        <div className="container-fluid jumbotron centered">
          <h1>Rezultatele căutării</h1>

          <ul id="postsList" className="list-group" >
            {query_results?.destinations.map((destination, idx) => {
              const distance = getDistanceFromLatLonInKm(geolocation_state.latitude, geolocation_state.longitude, destination.lat, destination.lon);

              console.log("User location: ", geolocation_state.latitude, geolocation_state.longitude)
              console.log("Destination location: ", destination.lat, destination.lon);
              console.log("Distance: ", distance);
              console.log("Max distance: ", search.maxDistance);

              if (distance > search.maxDistance) { // scuze ma cam doare capul
                return null;
              }

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
            {visibleComments?.map((comment, idx) => {
              return (
                <div key={idx} className="list-group-item list-group-item-action" id="postsItems">
                  {/* <small>{comment.nickname} a comentat la data de {comment.date_posted}:</small>
                  <p>{comment.content}</p> */}

                  <div className="comment-header">
                    <img
                      src={comment.profile_picture_location || default_profile_picture}
                      alt={`${comment.nickname}'s profile`}
                      className="comment-profile-pic"
                      referrerPolicy='no-referrer'
                    />
                    <small>{comment.nickname} a comentat la data de <br /> {new Date(comment.date_posted).toLocaleDateString()}:</small>
                  </div>
                  <p id="comment-text">{comment.content}</p>
                </div>
              );
            })}

            {nextBatchComments < query_results?.comments.length && (
              <div ref={refComments}>
                <h1>Se încarcă mai multe comentarii...</h1>
              </div>
            )}
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