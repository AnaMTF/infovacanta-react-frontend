import { useState } from 'react'
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import logo from "../resources/infovacanta_logo.png";

import "../css/styles.css";
import "../css/header.css";
import "../css/statiuni.css";

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Link } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.css";
import { fetchDestinations } from '../utils/fetchFunctions';

function CardReview(props) {
  return (
    <div className="card">
      <img src={props.content.location} className="card-img-top" alt="Mamaia" />
      <div className="card-body">
        <h5 className="card-title">{props.content.destination_name}</h5>
        <small>{props.content.destination_category}</small>
        <p className="card-text">{props.content.description}</p>
        <Link to={props.content.destination_link}>
          <button className="btn btn-primary buton-statiuni">
            <i className="fa-solid fa-circle-info" style={{
              marginRight: "6px"
            }} />
            Mai multe detalii</button>
        </Link>
      </div>
    </div>
  );
}

export const Statiuni = ({ list }) => {
  const { data: statiuni } = useQuery(["Destinations"], async () => fetchDestinations());

  return (
    <>
      <div className="container jumbotron centered">
        <h1>Stațiuni</h1>
        <div className="row">
          {statiuni?.map((statiune, idx) => {
            return (
              <div className="col-sm-4" id="cardDestinatii">
                <CardReview content={statiune} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};