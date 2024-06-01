import React, { Component } from 'react'
import { useEffect } from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/profil.css";

import useExternalScripts from "../hooks/useExternalScripts"

export const Profil = () => {
  useExternalScripts("../scripts/profil.js");

  return (
    <div class="container jumbotron centered">

      <div class="row">
        <div id="cardProfil">
          <div class="card">
            <div class="bannerClass" id="btnChangeBanner">
              <img src="images/banner.png" class="bannerImg" alt="Banner" />
                <div class="middleBanner" >
                  <div class="textFundal">Schimbă imaginea de fundal</div>
                </div>
            </div>
            <div class="profileClass" id="btnChangeProfile">
              <img src="images/infovacanta_logo.png" class="imagineProfil" alt="Profil" />
                <div class="middleProfile" >
                  <div class="textProfil">Schimbă imaginea de profil</div>
                </div>
            </div>
            <div class="card-body">
              <h5 class="card-title ">nickname: AUTHOR NICKNAME?</h5>
              <h6>nume: FULL NAME</h6>
              <h6>email: EMAIL </h6>
              <p class="card-text">Aici vei găsi toate recenziile postate de tine.</p>
              <a href="/new" class="btn btn-primary">Adaugă o recenzie</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};