import React, { Component, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import { Review } from "../components/Review";

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

import { useParams } from "react-router-dom";

import { Tooltip, OverlayTrigger } from 'react-bootstrap';

import { AllCommentsModal } from '../components/AllCommentsModal';
import { fetchAllComments, fetchReviewsByUserId, fetchUserInfoById, fetchUserStatisticsById } from '../utils/fetchFunctions';

import badge_age_0 from "../resources/trophies/age-0.png";
import badge_age_1 from "../resources/trophies/age-1.png";
import badge_age_2 from "../resources/trophies/age-2.png";
import badge_age_3 from "../resources/trophies/age-3.png";
import badge_age_4 from "../resources/trophies/age-4.png";
import badge_age_5plus from "../resources/trophies/age-5plus.png";

export const ProfileOtherUser = (props) => {
  const { userId } = useParams();

  const user = useSelector((state) => state.user.user);

  const { data: thisUser } = useQuery(["User", userId], async () => fetchUserInfoById(userId));
  const { data: reviews } = useQuery(["Review Cards", userId], async () => fetchReviewsByUserId(userId));
  const { data: userStats, isFetchedAfterMount: statsLoaded } = useQuery(["User Statistics", userId], async () => fetchUserStatisticsById(userId));

  useEffect(() => {
    console.log("\nthisUser: ", thisUser);
    console.log("\nreviews: ", reviews);
    console.log("\nuserStats: ", userStats)
  }, [thisUser, reviews, userStats])

  const [hasBronzeComments, setBronzeComments] = useState(false);
  const [hasSilverComments, setSilverComments] = useState(false);
  const [hasGoldComments, setGoldComments] = useState(false);
  const [hasBronzeReviews, setBronzeReviews] = useState(false);
  const [hasSilverReviews, setSilverReviews] = useState(false);
  const [hasGoldReviews, setGoldReviews] = useState(false);
  const [accountAge, setAccountAge] = useState("0");
  const [badgeAge, setBadgeAge] = useState(null);

  useEffect(() => {
    userStats?.map((stat) => {
      if (stat.num_reviews >= 5) {
        setBronzeReviews(true);
        console.log("Bronze Reviews");
      }

      if (stat.num_reviews >= 10) {
        setSilverReviews(true);
        console.log("Silver Reviews");
      }

      if (stat.num_reviews >= 15) {
        setGoldReviews(true);
        console.log("Gold Reviews");
      }

      if (stat.num_comments >= 5) {
        setBronzeComments(true);
        console.log("Bronze Comments");
      }

      if (stat.num_comments >= 10) {
        setSilverComments(true);
        console.log("Silver Comments");
      }

      if (stat.num_comments >= 15) {
        setGoldComments(true);
        console.log("Gold Comments");
      }

      if (stat.acc_age) {
        setAccountAge(stat.acc_age);

        console.log("Account Age: ", stat.acc_age);
        switch (stat.acc_age) {
          case "0":
            setBadgeAge(badge_age_0);
            break;
          case "1":
            setBadgeAge(badge_age_1);
            break;
          case "2":
            setBadgeAge(badge_age_2);
            break;
          case "3":
            setBadgeAge(badge_age_3);
            break;
          case "4":
            setBadgeAge(badge_age_4);
            break;
          default:
            setBadgeAge(badge_age_5plus);
            break;
        }
      }
    });
  }, [userStats, statsLoaded]);

  return (
    <div className="container jumbotron centered">

      <div className="row">
        <div id="cardProfil">
          <div className="card">
            <div className="bannerClass" id="btnChangeBanner">
              <img src={
                thisUser?.map((user) => {
                  return user.bg_location;
                }) || banner
              } className="bannerImg" alt="Banner" />
              {/* <div className="middleBanner" >
                <div className="textFundal">Schimbă imaginea de fundal</div>
              </div> */}
            </div>

            <div className="profileClass" id="btnChangeProfile">
              <img src={
                thisUser?.map((user) => {
                  return user.pfp_location;
                }) || default_profile_picture
              } className="imagineProfil" alt="Profil" />
              {/* <div className="middleProfile" >
                <div className="textProfil">Schimbă imaginea de profil</div>
              </div> */}
            </div>

            <div className="card-body">
              <h5 className="card-title ">{
                thisUser?.map((user) => {
                  return user.nickname;
                })
              }</h5>
              <h6>nume: {
                thisUser?.map((user) => {
                  return user.full_name;
                })
              }</h6>
              <h6>email: {
                thisUser?.map((user) => {
                  return user.email;
                })
              }</h6>
              {/* <h6>vechime cont: {accountAge} ani</h6> */}
              <p className="card-text">Aici vei găsi toate recenziile postate de acest utilizator.</p>

            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <ul id="postsList" className="list-group">
            {reviews?.map((review, idx) => {
              return (<Review key={idx} loggedInUserId={user?.user_id} content={review} />);
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
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  {
                    accountAge == "1" ? "Acest utilizator este membru InfoVacanță de un an!" : `Acest utilizator este membru InfoVacanță de ${accountAge} ani!`
                  }
                </Tooltip>
              }>
                <img src={badgeAge} alt="Trophy" width="100" height="100" style={{
                  // borderRadius: "50%",
                  margin: "10px 10px 10px 10px",
                }} />
              </OverlayTrigger>
            }
            {
              hasBronzeReviews &&
              <OverlayTrigger placement="bottom" overlay={
                <Tooltip>
                  Acest utilizator are cel puțin 5 recenzii!
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
                  Acest utilizator are cel puțin 10 recenzii!
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
                  Acest utilizator are cel puțin 15 recenzii!
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
                  Acest utilizator are cel puțin 5 comentarii!
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
                  Acest utilizator are cel puțin 10 comentarii!
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
                  Acest utilizator are cel puțin 15 comentarii!
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