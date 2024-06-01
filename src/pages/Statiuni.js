import React, { Component } from 'react'
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import logo from "../resources/infovacanta_logo.png";

import "../css/styles.css";
import "../css/header.css";
import "../css/statiuni.css";


function Card(props) {
  return (<div className="card">
    <img src="http://localhost:5000/Sinaia.jpeg" className="card-img-top" alt="Mamaia" />
    <div className="card-body">
      <h5 className="card-title">{props.content.destination_name}</h5>
      <small>{props.content.destination_category}</small>
      <p className="card-text">{props.content.description}</p>
      <a href="https://www.mamaia.ro/" className="btn btn-primary">Mai multe detalii</a>
    </div>
  </div>);
}

export const Statiuni = () => {
  const { data: statiuni } = useQuery(["review_id"], async function () {
    try {
      const result = await Axios.get("http://localhost:5000/destinations");
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  return (
    <div className="container jumbotron centered">
      <h1>Stațiuni</h1>
      <div className="row">
        {statiuni?.map((statiune, idx) => {
          return (
            <div className="col-sm-4" id="cardDestinatii">
              <Card content={statiune}></Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};