import React from "react";

import "../css/header.css";
import "../css/styles.css";
import "../css/main.css";

import { AllCommentsModal } from "../components/AllCommentsModal";

import { Container, Navbar, Nav, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';

import { useSelector } from 'react-redux';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

import Axios from "axios";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

import { Review } from "../components/Review";
import { fetchAllComments } from "../utils/fetchFunctions";
import { useInView } from 'react-intersection-observer';
import { useGeolocation } from "@uidotdev/usehooks";

import getDistanceFromLatLonInKm from '../utils/trigonometryFunctions.js';

export const Statiune = (props) => {
  const sortType = useSelector((state) => state.sortType.value);
  const geolocation = useGeolocation();

  const user = useSelector((state) => state.user.user);

  const [coordinates, setCoordinates] = useState({ lat: 45.9442858, lng: 25.0094303 });
  const [reviews, setReviews] = useState([]);

  const { nume } = useParams();

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [nextBatch, setNextBatch] = useState(0);
  const { ref, inView } = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (inView && nextBatch < reviews.length) {
      const batchSize = 1; // Number of reviews to load per batch
      const newBatch = reviews.slice(nextBatch, nextBatch + batchSize);
      setVisibleReviews(prev => [...prev, ...newBatch]);
      setNextBatch(nextBatch + batchSize);
    }
  }, [inView, nextBatch, reviews]);

  useEffect(() => { // cand se schimba sortType sau geolocation
    if (reviews) {
      setVisibleReviews(reviews.slice(0, 1));
      setNextBatch(1);
    }
  }, [reviews]);

  const { data: statiune, isError, isPaused, isFetchedAfterMount } = useQuery(["Destination Information", nume, sortType, geolocation], async function () {
    try {
      const result = await Axios.get(`https://localhost:5000/query/destinations/${nume}`);
      console.log(`https://localhost:5000/query/destinations/${nume}`);
      setCoordinates({ lat: result.data[0].lat, lng: result.data[0].lon });
      console.log('statiune:', result.data[0]);

      const result_reviews = await Axios.get(`https://localhost:5000/destinations/${result.data[0]?.destination_id}/review-cards`);

      switch (sortType) {
        case 'newest_first':
        case 'closest': // Toate sunt la aceeasi distanta
          setReviews(result_reviews.data);
          break;
        case 'oldest_first':
          setReviews(result_reviews.data.reverse());
          break;
        case 'most_upvotes':
          setReviews(result_reviews.data.sort((a, b) => b.upvotes - a.upvotes));
          break;
        case 'best_rating':
          setReviews(result_reviews.data.sort((a, b) => b.rating - a.rating));
          break;
      }

      // setReviews(result_reviews.data);
      console.log('reviews:', reviews);

      // console.log(result.data[0]); // <-- testare: afisare date in consola   
      return result.data[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // useEffect(() => {
  //   console.log("COORDONATELE SUNT", coordinates)
  // }, [coordinates]);

  const switchCategory = function (category) {
    switch (category) {
      case "mare":
        return (<h2><i class="fa-solid fa-umbrella-beach" style={{
          marginRight: "6px"
        }}></i>Stațiune pe litoral</h2>);
        break;
      case "munte":
        return (<h2><i class="fa-solid fa-mountain" style={{
          marginRight: "6px"
        }}></i>Stațiune montană</h2>);
        break;
      case "balnear":
        return (<h2><i class="fa-solid fa-hot-tub-person" style={{
          marginRight: "6px"
        }}></i>Stațiune balneară</h2>);
        break;
    };
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="jumbotron bg-primary text-center py-5">
        <Container>
          <h1>{statiune?.destination_name}</h1>
          {switchCategory(statiune?.destination_category)}

          {/* <Alert variant="info">
            {
              [statiune?.coordinates.x, statiune?.coordinates.y].toString()
            }
            <button onClick={() => {
              // setCoordinates({ lat: statiune?.coordinates.x, lng: statiune?.coordinates.y });
              console.log("Show on map!", coordinates);
            }}>Show on map</button>
          </Alert> */}
        </Container>
      </div>

      <Container id="about" className="text-center my-5">
        <Row>
          <Col md={6}>
            <h2>
              <i class="fa-regular fa-pen-to-square" style={{
                marginRight: "6px"

              }}></i>Descriere</h2>
            <p>
              {statiune?.description}
            </p>
          </Col>
          <Col md={6}>
            <img src={statiune?.location} className="img-fluid" alt="About City" /> {/* Replace with your image */}
          </Col>
        </Row>
      </Container>

      <Container id="map" className="my-5">
        <h2 className="text-center">
          <i class="fa-solid fa-location-dot" style={{
            marginRight: "6px"
          }}></i>
          Locația stațiunii</h2>
        <Row>
          <Col>
            {
              isFetchedAfterMount && <MapContainer center={
                // [statiune?.coordinates.x, statiune?.coordinates.y]
                coordinates
              } zoom={10} style={{ height: "500px", width: "100%" }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <Marker position={coordinates}>
                  <Popup>
                    {`Aici se află stațiunea ${statiune?.destination_name}`}
                  </Popup>
                </Marker>
              </MapContainer>
            }

          </Col>


        </Row>
      </Container>

      <div className="container-fluid jumbotron centered">
        <h1>Recenziile stațiunii</h1>
        <ul id="postsList" className="list-group">
          {visibleReviews?.map((review, idx) => {
            return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
          })}
        </ul>

        {nextBatch < reviews?.length && (
          <div ref={ref}>
            <h1>Se încarcă mai multe recenzii...</h1>
          </div>
        )}
      </div>
    </div>
  );
};