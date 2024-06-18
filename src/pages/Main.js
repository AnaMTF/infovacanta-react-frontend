import React, { useState, Component, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";
import "../css/savebuttons.css";

import { Link } from "react-router-dom";

import { AllCommentsModal } from "../components/AllCommentsModal";
import { NewCommentModal } from "../components/NewCommentModal";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// import Chatbot from '../components/Chatbot';

import { RateButton, UpdownButton } from '@lyket/react';

import "@fortawesome/fontawesome-free/css/all.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import "@fortawesome/fontawesome-free";

export function Review(props) {
  const [showComments, setShowComments] = useState(false);
  const [showNewComment, setShowNewComment] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showAreYouSure, setShowAreYouSure] = useState(false);

  const fetchData = async function () {
    const params = new URLSearchParams();
    params.append("review_id", props.content.review_id);
    params.append("user_id", props.loggedInUserId);

    try {
      const result = await Axios.get("http://localhost:5000/save-review", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      const savedReviews = result.data;
      const savedReviewIds = savedReviews.map((review) => review.review_id);
      setIsSaved(savedReviewIds.includes(props.content.review_id));

    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteReview = async function () {
    setShowAreYouSure(false);

    try {
      await Axios.delete(`http://localhost:5000/reviews/${props.content.review_id}`);
      console.log("Review deleted");
    } catch (error) {
      console.error(error);
    }
  }

  const editReview = async function () {

  }

  const commentReview = async function () {

  }

  const saveReview = async function () {
    const params = new URLSearchParams();
    params.append("review_id", props.content.review_id);
    params.append("user_id", props.loggedInUserId);
    setIsSaved(true);

    try {
      await Axios.post("http://localhost:5000/save-review", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  // nu inteleg de ce nu merge
  const unsaveReview = async function () {
    const params = new URLSearchParams();
    params.append("review_id", props.content.review_id);
    params.append("user_id", props.loggedInUserId);
    setIsSaved(false);
    try {
      await Axios.delete("http://localhost:5000/save-review", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (<li className="list-group-item list-group-item-action" id="postsItems">
    <h2>{props.content.destination_name}</h2>
    <small>{props.content.destination_category}</small>
    <p>{props.content.review_body}</p>

    <small><a style={{
      color: "#888"
    }} href={`/profil/${props.content.author_id}`}>By: {props.content.nickname}</a></small>

    <small>Date posted: {props.content.date_posted}</small>
    <div id="starRating" data-lyket-type="rate" data-lyket-id={`my-${props.content.review_id}-post`} data-lyket-show-rating="average"></div>
    <div className="lyket-counter" data-lyket-type="updown" data-lyket-id="my-<%=i%>-post" data-lyket-namespace="blog" data-lyket-template="simple"></div>
    {
      props.loggedInUserId == props.content.author_id &&
      <Link to="">
        <button className="edit">Editează</button>
      </Link>
    }
    {
      props.loggedInUserId == props.content.author_id &&
      <button className="delete" onClick={() => setShowAreYouSure(true)}>Șterge</button>
    }
    {
      props.loggedInUserId && <button className="comment" onClick={() => setShowNewComment(true)}>Lasă un comentariu</button>
    }
    <button className="comment" onClick={() => setShowComments(true)}>Vezi toate comentariile</button>

    {
      !isSaved ?
        <button id="saveButton" onClick={saveReview}>
          <i className="fa-star fa-regular"></i> Adaugă la recenziile favorite
        </button>
        :
        <button id="unsaveButton" onClick={unsaveReview}>
          <i className="fa-star fa-solid"></i> Scoate recenzia de la favorite
        </button>
    }

    <div style={{ width: "100%" }}>
      <RateButton className="list-group-item"
        namespace="infovacanta-react"
        id={`review-${props.content.review_id}`}
        showRating="average"
      />

      <UpdownButton className="list-group-item lyket-counter"
        namespace='infovacanta-react'
        id={`review-${props.content.review_id}`}
        template='simple'
      >
      </UpdownButton>
    </div>

    <AllCommentsModal
      review_id={props.content.review_id}
      author_nickname={props.content.nickname}
      show={showComments} onHide={() => setShowComments(false)}
    ></AllCommentsModal>

    <NewCommentModal
      review_id={props.content.review_id}
      review_author_nickname={props.content.nickname}
      show={showNewComment} onHide={() => setShowNewComment(false)}
    ></NewCommentModal>

    <Modal show={showAreYouSure} onHide={() => setShowAreYouSure(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Ștergere recenzie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Ești sigur că dorești să ștergi această recenzie?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowAreYouSure(false)}>Înapoi</Button>
        <Button variant="danger" onClick={deleteReview}>Da, șterge</Button>
      </Modal.Footer>s
    </Modal>
  </li>);
}


export const Main = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: reviews } = useQuery(["review_id"], async function () {
    try {
      const result = await Axios.get("http://localhost:5000/reviews");
      //console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2/inject.js";

    const script2 = document.createElement('script');
    script2.src = "https://mediafiles.botpress.cloud/75424437-4b00-4535-8cf2-b56dbabe0397/webchat/v2/config.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    }
  }, []);

  return (
    <div className="container-fluid jumbotron centered">
      <h1>InfoVacanță</h1>
      <Link to="/new">
        <button id="newPostBtn">Recenzie Nouă</button>
      </Link>
      {/* <Link to="/profil">
        <button id="newPostBtn">Profil ({user?.nickname || "no user detected"})</button>
      </Link> */}
      {/* <Link to="/">
        <button id="logoutBtn" onClick={() => dispatch(logoutUser(navigate))}>Logout</button>
      </Link> */}

      <ul id="postsList" className="list-group">
        {reviews?.map((review, idx) => {
          return (
            <Review loggedInUserId={user?.user_id} key={idx} content={review}></Review>
          );
        })}
      </ul>

      {/* <Chatbot /> */}

    </div>
  );
};