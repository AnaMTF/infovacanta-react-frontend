import { Link } from "react-router-dom";

// import Navbar from "react-bootstrap/Navbar";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import { FormControl } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Nav from "react-bootstrap/Nav";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Image from "react-bootstrap/Image";

import logo from "../resources/infovacanta_logo.png";
import default_profile_picture from "../resources/blank-profile-pic.png";

import "../css/styles.css";
import "../css/header.css";

export const InfoVacantaNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a className="navbar-brand" href="/"><img src={logo} alt="logo InfoVacanță" height="80px" width="80px" />InfoVacanță</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/statiuni">Stațiuni</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contact">Contact</a>
          </li>
          <li>
            <div className="search-container">
              <form action="/action_page.php" className="d-flex">
                <input type="text" placeholder="Search.." name="search" id="search-navbar" />
                <button type="submit" id="button-navbar-search">Submit</button>
              </form>
            </div>
          </li>
          <li>
            <a href="/profil"><img src={default_profile_picture} alt="Poza de profil" height="40px" width="40px" /></a>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Profil</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/profil">Vezi profilul</a></li>
              <li><a className="dropdown-item" href="/logout">Log out</a></li>
              <li><a className="dropdown-item" href="#">Editează profilul</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}