import { Container, Navbar, Nav, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import Axios from "axios";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const Statiune = (props) => {
  let [coordinates, setCoordinates] = useState({ lat: 45.9442858, lng: 25.0094303 });

  let { nume } = useParams();
  let { data: statiune, isError, isPaused } = useQuery(["destination_link"], async function () {
    try {
      const result = await Axios.get(`http://localhost:5000/query/destinations/${nume}`);
      console.log(`http://localhost:5000/query/destinations/${nume}`);
      // setCoordinates({ lat: result.data[0].coordinates.x, lng: result.data[0].coordinates.y });

      console.log(result.data[0]); // <-- testare: afisare date in consola   
      return result.data[0];
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  // const { data: coordinates } = useQuery(["coordinates"], async function () {
  //   try {
  //     const result = await Axios.get(`http://localhost:5000/query/destinations/${nume}`);
  //     console.log(`http://localhost:5000/query/destinations/${nume}`);
  //     console.log(result.data[0].coordinates.x, result.data[0].coordinates.y);
  //     return [result.data[0].coordinates.x, result.data[0].coordinates.y];
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // });

  // useEffect(() => {
  //   console.log("UseEffect: ", coordinates);
  //   // setCoordinates({ lat: statiune?.coordinates.x, lng: statiune?.coordinates.y });
  // }, []);

  const switchCategory = function (category) {
    switch (category) {
      case "mare":
        return (<h2>Stațiune pe litoral</h2>);
        break;
      case "munte":
        return (<h2>Stațiune montană</h2>);
        break;
      case "balnear":
        return (<h2>Stațiune balneară</h2>);
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
            <h2>Descriere</h2>
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
        <h2 className="text-center">Locația stațiunii</h2>
        <Row>
          <Col>
            <MapContainer center={
              // [statiune?.coordinates.x, statiune?.coordinates.y]
              coordinates
            } zoom={10} style={{ height: "500px", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
};