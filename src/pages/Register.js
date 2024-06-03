import React, { Component } from 'react'

import "../css/styles.css";
import "../css/header.css";
import "../css/register.css";

export const Register = () => {
  return (
    <div>
      <div className="container mt-5 jumbotron centered">
        <h1>Register</h1>

        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form action="http://localhost:5000/auth/register/password" method="POST">
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Emailul dumneavoastră"
                      name="email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nickname">Nume de utilizator</label>
                    <input
                      type="text"
                      id="nickname"
                      className="form-control"
                      placeholder="Numele dumneavoastră de utilizator"
                      name="nickname"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="fullname">Nume complet</label>
                    <input
                      type="text"
                      id="full_name"
                      className="form-control"
                      placeholder="Numele dumneavoastră complet"
                      name="full_name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Parolă</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Parola dumneavoastră"
                      name="password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="profile-picture">Poză de profil</label>
                    <input
                      type="file"
                      id="profile_picture"
                      className="form-control"
                      placeholder="Alegeți o poză de profil"
                      name="profile_picture"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card social-block">
              <div className="card-body">
                <a className="btn btn-block" href="/auth/google" role="button">
                  <i className="fab fa-google">Sign Up with Google</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};