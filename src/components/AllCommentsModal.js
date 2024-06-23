import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import "../css/comments.css";
import default_profile_picture from "../resources/blank-profile-pic.png";

export const AllCommentsModal = (props) => {
  const { data: comments, isLoading, error } = useQuery(["comment_id"], async function () {
    try {
      console.log(`GET: http://localhost:5000/reviews/${props.review_id}/comments`);

      const response = await Axios.get(`http://localhost:5000/reviews/${props.review_id}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    console.log("MODAL OPENED\nREVIEW ID: ", props.review_id);
  }, []);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comentarii la postarea utilizatorului {props.author_nickname}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="comments">
        {isLoading && <p>Se încarcă comentariile...</p>}
        {error && <p>Eroare la încărcarea comentariilor</p>}
        <div id="postsList" className="list-group">
          {comments?.map((comment, idx) => {
            return (
              <div key={idx} className="list-group-item list-group-item-action comment-item" id="postsItems">
                <div className="comment-header">
                  <img
                    src={comment.profile_picture_location || default_profile_picture}
                    alt={`${comment.nickname}'s profile`}
                    className="comment-profile-pic"
                  />
                  <small>{comment.nickname} a comentat la data de <br /> {new Date(comment.date_posted).toLocaleDateString()}:</small>
                </div>
                <p id="comment-text">{comment.content}</p>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};
