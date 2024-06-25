import React, { useState } from 'react';
import Axios from "axios";
import default_profile_picture from "../resources/blank-profile-pic.png";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { NewCommentModal } from "./NewCommentModal";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { RateButton, UpdownButton } from '@lyket/react';
import { addToSavedReviews, removeFromSavedReviews } from '../app/userSlice';


export function Review(props) {
  const user = useSelector((state) => state.user.user);

  const [showNewComment, setShowNewComment] = useState(false);

  const [isSaved, setIsSaved] = useState(user?.saved_reviews.includes(props.content.review_id) || false);

  const [showAreYouSure, setShowAreYouSure] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteReview = async function () {
    setShowAreYouSure(false);

    try {
      console.log(props.content.review_id);
      await Axios.delete(`http://localhost:5000/reviews/${props.content.review_id}`);
      console.log("Review deleted");
    } catch (error) {
      console.error(error);
    } finally {
      navigate("/main", { replace: true });
    }
  };

  const editReview = async function () {
    navigate(`/edit/${props.content.review_id}`);
  };

  const commentReview = async function () {
  };

  const saveReview = async function () {
    const params = new URLSearchParams();
    params.append("review_id", props.content.review_id);
    params.append("user_id", props.loggedInUserId);

    setIsSaved(true);
    dispatch(addToSavedReviews(props.content.review_id));

    try {
      await Axios.post("http://localhost:5000/save-review", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  // nu inteleg de ce nu merge
  const unsaveReview = async function () {
    const params = new URLSearchParams();
    params.append("review_id", props.content.review_id);
    params.append("user_id", props.loggedInUserId);

    setIsSaved(false);
    dispatch(removeFromSavedReviews(props.content.review_id));

    try {
      await Axios.post("http://localhost:5000/unsave-review", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (<li className="list-group-item list-group-item-action" id="postsItems">
    <h2>{props.content.destination_name}</h2>
    <small>{props.content.destination_category}</small>

    <a href={props.loggedInUserId === props.content.author_id ? '/profil' : `/profil/${props.content.author_id}`}>
      <Image
        src={props.content.author_profile_picture_location || default_profile_picture}

        width="30"
        height="30"
        className="d-inline-block align-top profile-pic"
        alt="Profile"
        style={{ objectFit: 'cover' }} />
    </a>

    <small><a style={{
      color: "#888"
    }} href={props.loggedInUserId === props.content.author_id ? '/profil' : `/profil/${props.content.author_id}`}>By: {props.content.author_nickname}</a></small>

    <p>{props.content.review_body}</p>
    <small>Date posted: {new Date(props.content.date_posted).toLocaleDateString()}</small>
    <div data-lyket-type="rate" namespace="infovacanta-react" data-lyket-id={`review-${props.content.review_id}`} data-lyket-show-rating="average"></div>
    <div className="lyket-counter" data-lyket-type="updown" data-lyket-id={`my-${props.content.review_id}-post`} data-lyket-namespace="blog" data-lyket-template="simple"></div>
    {props.loggedInUserId == props.content.author_id &&
      <button className="edit" onClick={editReview}>
        <i className="fa-solid fa-highlighter" style={{ marginRight: "6px" }} />
        Editează</button>}
    {props.loggedInUserId == props.content.author_id &&
      <button className="delete" onClick={() => setShowAreYouSure(true)}>
        <i className="fa-solid fa-eraser" style={{ marginRight: "6px" }} />
        Șterge</button>}
    {props.loggedInUserId && <button className="comment" onClick={() => setShowNewComment(true)}>
      <i className="fa-solid fa-comment" style={{ marginRight: "6px" }} />
      Lasă un comentariu</button>}
    <button className="all-comments" onClick={() => props.toggleShowComments(props.content.review_id)}>
      <i className="fa-solid fa-comments" style={{ marginRight: "6px" }} />
      Vezi toate comentariile</button>

    {user && (
      !isSaved ?
        <button id="saveButton" onClick={saveReview}>
          <i className="fa-star fa-regular"></i> Adaugă la recenziile favorite
        </button>
        :
        <button id="unsaveButton" onClick={unsaveReview}>
          <i className="fa-star fa-solid"></i> Scoate recenzia de la favorite
        </button>
    )}

    <div style={{ width: "100%" }}>
      <RateButton className="list-group-item"
        namespace="infovacanta-react"
        id={`review-${props.content.review_id}`}
        showRating="average" />

      <UpdownButton className="list-group-item lyket-counter"
        namespace='infovacanta-react'
        id={`review-${props.content.review_id}`}
        template='simple'
      >
      </UpdownButton>
    </div>

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
      </Modal.Footer>
    </Modal>
  </li>);
}
