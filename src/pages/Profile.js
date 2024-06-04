import React, { Component } from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/profil.css";

import logo from "../resources/infovacanta_logo.png";

export const Profile = () => {
  return (
    <div className="container jumbotron centered">

      <div className="row">
        <div id="cardProfil">
          <div className="card">
            <div className="bannerClass" id="btnChangeBanner">
              <img src="images/banner.png" className="bannerImg" alt="Banner" />
              <div className="middleBanner" >
                <div className="textFundal">Schimbă imaginea de fundal</div>
              </div>
            </div>
            <div className="profileClass" id="btnChangeProfile">
              <img src={logo} className="imagineProfil" alt="Profil" />
              <div className="middleProfile" >
                <div className="textProfil">Schimbă imaginea de profil</div>
              </div>
            </div>
            <div className="card-body">
              <h5 className="card-title ">nickname: </h5>
              <h6>nume: </h6>
              <h6>email: </h6>
              <p className="card-text">Aici vei găsi toate recenziile postate de tine.</p>
              <a href="/new" className="btn btn-primary">Adaugă o recenzie</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};