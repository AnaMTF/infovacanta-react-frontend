import React, { Component } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import { Review } from "../pages/Main";

import "../css/profil.css";
import "../css/main.css";

import logo from "../resources/infovacanta_logo.png";
import banner from "../resources/banner.png";

import commentsBronze from "../resources/trophies/bronze-cup.png";
import commentsSilver from "../resources/trophies/silver-cup.png";
import commentsGold from "../resources/trophies/gold-cup.png";

import upvotesBronze from "../resources/trophies/medal-bronze.png"
import upvotesSilver from "../resources/trophies/medal-silver.png"
import upvotesGold from "../resources/trophies/medal-gold.png"


export const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: reviews, isLoading, error } = useQuery(["reviews"], async () => {
    try {
      const result = await Axios.get(`http://localhost:5000/users/${user?.user_id}/reviews`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  })

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

      <div className="row">
        <div className="col-md-8">
          <ul id="postsList" className="list-group">
            {reviews?.map((review, idx) => {
              return (
                <Review loggedInUserId={user?.user_id} key={idx} content={review}></Review>
              );
            })}
          </ul>
        </div>
        <div className="col-md-auto" style={{
          paddingTop: "22.5px",
          width: "300px",
        }}>
          <div className="card container container-fluid" style={{
            padding: "10px 10px 10px 10px",
            margin: "10px 10px 10px 10px",

            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",

          }}>
            {
              [1, 2, 3, 4, 5].map(trophy => {
                return (
                  <img src={logo} alt="Trophy" width="100" height="100" style={{
                    borderRadius: "50%",
                    margin: "10px 10px 10px 10px",
                  }} />
                );
              })
            }
          </div>
        </div>
      </div>

    </div >
  );
};