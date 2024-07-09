import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import "../css/header.css";
import "../css/styles.css";
import "../css/login.css";

import "@fortawesome/fontawesome-free/css/all.min.css";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", email, password);

    dispatch(loginUser(email, password, navigate));
  };

  const handleLogin = (method) => {
    window.open(`https://localhost:5000/auth/${method}`, "_self");
  };

  return (
    <div className="container mt-5 jumbotron centered">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}> {/* functie simpla sau asa, dar nu e.target.value  */}
                <div className="form-group">
                  <i className="fa-solid fa-envelope"></i>
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
                  <i className="fa-solid fa-key"></i>
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
          <div className="card google" style={{
            marginBottom: "25px"
          }}>
            <div className="card-body">
              <button className="btn btn-block " onClick={() => handleLogin('google')}>
                <i className="fab fa-google" style={{
                  paddingRight: "6px"
                }} />
                Sign In with Google
              </button>
            </div>
          </div>

          <div className="card facebook" style={{
            marginBottom: "25px"
          }}>
            <div className="card-body ">
              <button className="btn btn-block " onClick={() => handleLogin('facebook')}>
                <i className="fab fa-facebook" style={{
                  paddingRight: "6px"
                }} />
                Sign In with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}