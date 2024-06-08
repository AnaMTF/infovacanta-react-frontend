import logo from "../resources/infovacanta_logo.png";

import "../css/header.css";
import "../css/styles.css";
import "../css/home.css";

import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="jumbotron centered">
      <div className="containerOnHome">
        <img src={logo} alt="Logoul aplicației infoVacanță" className="logo" />
        <h1 className="display-3">InfoVacanță</h1>
        <p className="lead">Toate informațiile necesare, disponibile într-un singur loc!</p>
        <hr />
        <Link to="/register">
          <button className="btn btn-light btn-lg">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn btn-dark btn-lg">Login</button>
        </Link>
      </div>
    </div>
  );
}