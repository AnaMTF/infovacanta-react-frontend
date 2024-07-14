import React, { useState, Component } from 'react';
import Axios from 'axios';

import "../css/styles.css";
import "../css/header.css";
import "../css/register.css";
import { useLocation, useNavigate } from 'react-router-dom';

export const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [full_name, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [profile_picture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('email', email);
    formData.append('nickname', nickname);
    formData.append('full_name', full_name);
    formData.append('password', password);

    if (profile_picture) {
      formData.append('profile_picture', profile_picture);
    }

    // if (!email || !nickname || !full_name || !password) {
    //   window.alert("Please fill in all the fields.");
    //   return;
    // }

    try {
      await Axios.post('https://localhost:5000/auth/register/password', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // await Axios.post('https://localhost:5000/test/echo', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

      navigate('/login'); console.log('navigate to login');

    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = (method) => {
    window.open(`https://localhost:5000/auth/${method}`, "_self");
  };

  return (
    <div>
      <div className="container mt-5 jumbotron centered">
        <h1>Register</h1>

        <div className="row">
          <div className="col-sm-8">
            <div className="card">
              <div className="card-body">
                <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}> {/* functie simpla sau asa, dar nu e.target.value  */}
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Emailul dumneavoastră"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
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
                      value={full_name}
                      onChange={(e) => setFullname(e.target.value)}
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      onChange={(e) => setProfilePicture(e.target.files[0])}
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
            <div className="card social-block google" style={{
              marginBottom: "25px"
            }}>
              <div className="card-body">
                <button className="btn btn-block btn-register" onClick={() => handleLogin('google')} >
                  <i className="fab fa-google" style={{
                    paddingRight: "6px"
                  }} />
                  Sign Up with Google
                </button>
              </div>
            </div>

            <div className="card social-block facebook">
              <div className="card-body">
                <button className="btn btn-block btn-register" onClick={() => handleLogin('facebook')} >
                  <i className="fab fa-facebook" style={{
                    paddingRight: "6px"
                  }} />
                  Sign Up with Facebook
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};