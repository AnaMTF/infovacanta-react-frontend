import React, { Component } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';



import "../css/profil.css";

import logo from "../resources/infovacanta_logo.png";
import banner from "../resources/banner.png";

export const Profile = () => {
  //const { data } = useQuery(["user_id"], async function () {
  // const { data: user } = useQuery(["user_id"], async function () {
  //   try {
  //     const result = await Axios.get("http://localhost:5000/auth/myprofile", { withCredentials: true });
  //     //console.log(result.data);
  //     return result;
  //   } catch (error) {
  //     console.error(error);
  //     return {
  //       nickname: "Nickname",
  //       full_name: "Nume Prenume",
  //       email: ""
  //     };
  //   }
  // });

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("User in Profile component:", user);

  return (
    <div className="container jumbotron centered">

      <div className="row">
        <div id="cardProfil">
          <div className="card">
            <div className="bannerClass" id="btnChangeBanner">
              <img src={banner} className="bannerImg" alt="Banner" />
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
              <h5 className="card-title ">{user?.nickname}</h5>
              <h6>nume: {user?.full_name}</h6>
              <h6>email: {user?.email}</h6>
              <p className="card-text">Aici vei găsi toate recenziile postate de tine.</p>
              <a href="/new" className="btn btn-primary">Adaugă o recenzie</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};