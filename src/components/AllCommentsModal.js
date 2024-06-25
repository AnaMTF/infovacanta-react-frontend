import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import "../css/comments.css";
import default_profile_picture from "../resources/blank-profile-pic.png";

export const AllCommentsModal = (props) => {
  // useEffect(() => {
  //   console.log(props);
  // }, []);

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Comentarii la postarea utilizatorului {props.author_nickname}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="comments">
        <div id="postsList" className="list-group">
          {props.content?.map((comment, idx) => {
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
