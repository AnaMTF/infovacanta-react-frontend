import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import "../css/header.css";
import "../css/styles.css";
import "../css/login.css";

import "@fortawesome/fontawesome-free"

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password, navigate));
  };

  return (
    <div className="container mt-5 jumbotron centered">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <i className="fa fa-envelope icon"></i>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    value={email}
                    id="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    id="password"
                    className="form-control"
                    onChange={(e) => setPassword(e.target.value)}
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
          <div className="card" style={{
            marginBottom: "25px"
          }}>
            <div className="card-body">
              <a className="btn btn-block" href="http://localhost:5000/auth/google" role="button">
                <i className="fab fa-google" style={{
                  paddingRight: "6px"
                }} />
                Sign In with Google
              </a>
            </div>
          </div>

          <div className="card" style={{
            marginBottom: "25px"
          }}>
            <div className="card-body">
              <a className="btn btn-block" href="/auth/google" role="button">
                <i className="fab fa-facebook" style={{
                  paddingRight: "6px"
                }} />
                Sign In with Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}