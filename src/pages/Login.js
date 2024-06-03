import React from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/login.css";

export const Login = () => {
  return (
    <div>
      <div className="container mt-5 jumbotron centered">
        <h1>Login</h1>

        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form action="http://localhost:5000/auth/login/password" method="POST">
                  <div className="form-group">
                    <i className="fa fa-envelope icon"></i>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Emailul dumneavoastră"
                      name="username"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <i className="fa fa-key icon"></i>
                    <label htmlFor="password">Parolă</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Parola domneavoastră"
                      name="password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <a className="btn btn-block" href="/auth/google" role="button">
                  <i className="fab fa-google">Sign In with Google</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};