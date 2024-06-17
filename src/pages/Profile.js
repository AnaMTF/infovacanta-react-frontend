import React, { Component } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import { Review } from "../pages/Main";

import "../css/profil.css";
import "../css/main.css";

import { useEffect } from 'react';

import logo from "../resources/infovacanta_logo.png";
import default_profile_picture from "../resources/blank-profile-pic.png";
import banner from "../resources/banner.png";

import commentsBronze from "../resources/trophies/bronze-cup.png";
import commentsSilver from "../resources/trophies/silver-cup.png";
import commentsGold from "../resources/trophies/gold-cup.png";

import reviewsBronze from "../resources/trophies/medal-bronze.png"
import reviewsSilver from "../resources/trophies/medal-silver.png"
import reviewsGold from "../resources/trophies/medal-gold.png"

import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: reviews } = useQuery(["reviews"], async () => {
    try {
      const result = await Axios.get(`http://localhost:5000/users/${user?.user_id}/reviews`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  })

  const { data: userStats } = useQuery(["userStats"], async () => {
    try {
      const result = await Axios.get(`http://localhost:5000/query/users/${user?.user_id}/statistics`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  });

  const [hasBronzeComments, setBronzeComments] = React.useState(true);
  const [hasSilverComments, setSilverComments] = React.useState(true);
  const [hasGoldComments, setGoldComments] = React.useState(true);
  const [hasBronzeReviews, setBronzeReviews] = React.useState(true);
  const [hasSilverReviews, setSilverReviews] = React.useState(true);
  const [hasGoldReviews, setGoldReviews] = React.useState(true);

  useEffect(() => {
    userStats?.map((stat) => {
      if (stat.num_reviews >= 0) {
        setBronzeReviews(true);
      }

      if (stat.num_reviews >= 0) {
        setSilverReviews(true);
      }

      if (stat.num_reviews >= 0) {
        setGoldReviews(true);
      }

      if (stat.num_comments >= 0) {
        setBronzeComments(true);
      }

      if (stat.num_comments >= 0) {
        setSilverComments(true);
      }

      if (stat.num_comments >= 0) {
        setGoldComments(true);
      }
    });
  }, [userStats]);

  return (
    <div className="container jumbotron centered">

      <div className="row">
        <div id="cardProfil">
          <div className="card">
            <div className="bannerClass" id="btnChangeBanner">
              <img src={user?.bg_location || banner} className="bannerImg" alt="Banner" />
              <div className="middleBanner" >
                <div className="textFundal">Schimbă imaginea de fundal</div>
              </div>
            </div>

            <div className="profileClass" id="btnChangeProfile">
              <img src={
                user?.pfp_location || default_profile_picture
              } className="imagineProfil" alt="Profil" />
              <div className="middleProfile" >
                <div className="textProfil">Schimbă imaginea de profil</div>
              </div>
            </div>

            <div className="card-body">
              <h5 className="card-title ">{user?.nickname}</h5>
              <h6>nume: {user?.full_name}</h6>
              <h6>email: {user?.email}</h6>
              <p className="card-text">Aici vei găsi toate recenziile postate de tine.</p>
              <Link to="/new">
                <button className="btn btn-primary">Adaugă o recenzie</button>
              </Link>

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
              hasBronzeReviews &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Ai cel puțin 5 recenzii!
                </Tooltip>
              }>
                <img src={reviewsBronze} alt="Trophy" width="100" height="100" style={{
                  borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>

            }
            {
              hasSilverReviews &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Ai cel puțin 10 recenzii!
                </Tooltip>
              }>
                <img src={reviewsSilver} alt="Trophy" width="100" height="100" style={{
                  borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>
            }
            {
              hasGoldReviews &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Ai cel puțin 15 recenzii!
                </Tooltip>
              }>
                <img src={reviewsGold} alt="Trophy" width="100" height="100" style={{
                  borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>
            }
            {
              hasBronzeComments &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Ai cel puțin 5 comentarii!
                </Tooltip>
              }>
                <img src={commentsBronze} alt="Trophy" width="100" height="100" style={{
                  borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>
            }
            {
              hasSilverComments &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Ai cel puțin 10 comentarii!
                </Tooltip>
              }>
                <img src={commentsSilver} alt="Trophy" width="100" height="100" style={{
                  borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>
            }
            {
              hasGoldComments &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Ai cel puțin 15 comentarii!
                </Tooltip>
              }>
                <img src={commentsGold} alt="Trophy" width="100" height="100" style={{
                  borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>
            }
          </div>
        </div>
      </div>

    </div >
  );
};