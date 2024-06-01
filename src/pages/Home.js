import React from 'react';

import logo from "../resources/infovacanta_logo.png";
import "../css/styles.css";
import "../css/header.css";
import "../css/home.css";

export const Home = () => {
  return (
    <div>
      <div class="jumbotron centered">
        <div class="containerOnHome">
          <img src={logo} alt="Logoul aplicației infoVacanță" class="logo" />
          <h1 class="display-3">InfoVacanță</h1>
          <p class="lead">Toate informațiile necesare, disponibile într-un singur loc!</p>
          <hr />
          <a class="btn btn-light btn-lg" href="/register" role="button">Register</a>
          <a class="btn btn-dark btn-lg" href="/login" role="button">Login</a>
        </div>
      </div>
    </div>
  );
};