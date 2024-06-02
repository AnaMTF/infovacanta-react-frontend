import React from 'react';

import "../css/styles.css";
import "../css/header.css";
import "../css/login.css";

export const Login = () => {
  return (
    <div>
      <div class="container mt-5 jumbotron centered">
        <h1>Login</h1>

        <div class="row">
          <div class="col-sm-8">
            <div class="card">
              <div class="card-body">
                <form action="http://localhost:5000/auth/login/password" method="POST">
                  <div class="form-group">
                    <i class="fa fa-envelope icon"></i>
                    <label for="email">Email</label>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Emailul dumneavoastră"
                      name="email"
                    />
                  </div>
                  <div class="form-group">
                    <i class="fa fa-key icon"></i>
                    <label for="password">Parolă</label>
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Parola domneavoastră"
                      name="password"
                    />
                  </div>
                  <button type="submit" class="btn btn-dark">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="col-sm-4">
            <div class="card">
              <div class="card-body">
                <a class="btn btn-block" href="/auth/google" role="button">
                  <i class="fab fa-google"></i>
                  Sign In with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};