import React, { Component } from 'react'

import logo from "../resources/infovacanta_logo.png";

import "../css/styles.css";
import "../css/header.css";
import "../css/statiuni.css";

export const Statiuni = () => {
    return (
        <div class="container jumbotron centered">
    <h1>Stațiuni</h1>
    <div class="row">
        <div class="col-sm-4" id="cardDestinatii">
            <div class="card">
                <img src={logo} class="card-img-top" alt="Mamaia" />
                <div class="card-body">
                    <h5 class="card-title">NUME STATIUNE</h5>
                    <small>CATEGORIE STATIUNE</small>
                    <p class="card-text">Mamaia este cea mai cunoscută stațiune de pe litoralul românesc. Este situată în nordul Constanței, la 4 km de centrul orașului. Mamaia este o stațiune modernă, cu hoteluri și restaurante de lux, cluburi și discoteci, plaje cu nisip fin și multe alte facilități.</p>
                    <a href="https://www.mamaia.ro/" class="btn btn-primary">Mai multe detalii</a>
                </div>
            </div>
        </div>
    </div>
</div>
    );
};