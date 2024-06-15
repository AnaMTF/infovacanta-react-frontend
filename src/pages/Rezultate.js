import React from "react";
import Axios from "axios";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Review } from "./Main";

import { Tab, Tabs, Card, Button } from "react-bootstrap";

import default_picture from "../resources/blank-profile-pic.png";
import banner from "../resources/banner.png";


export const Rezultate = (props) => {
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
                <div className="card" key={idx}>
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

      <Tab eventKey="users" title="Utilizatori" style={{ borderRadius: "unset" }}>
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
                    <Card.Title ><b>{user.nickname}</b></Card.Title>
                    <Card.Subtitle>{user.full_name}</Card.Subtitle>

                    <Card.Text>
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                    </Card.Text>

                    <Button variant="primary">View Profile</Button>
                  </Card.Body>
                </Card>
              );
            })}
          </ul>
        </div>
      </Tab>
    </Tabs>
  );
};