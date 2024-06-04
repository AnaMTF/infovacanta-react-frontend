import React from 'react';

import logo from "../resources/infovacanta_logo.png";
import "../css/styles.css";
import "../css/header.css";
import "../css/home.css";

export const Home = () => {
  return (
    <div>
      <div className="jumbotron centered">
        <div className="containerOnHome">
          <img src={logo} alt="Logoul aplicației infoVacanță" className="logo" />
          <h1 className="display-3">InfoVacanță</h1>
          <p className="lead">Toate informațiile necesare, disponibile într-un singur loc!</p>
          <hr />
          <a className="btn btn-light btn-lg" href="/register" role="button">Register</a>
          <a className="btn btn-dark btn-lg" href="/login" role="button">Login</a>
        </div>
      </div>
    </div>
  );
};