import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import "../css/comments.css";

export const AllCommentsModal = (props) => {
  const { data: comments, isLoading, error } = useQuery(["comment_id"], async function () {
    try {
      const response = await Axios.get(`http://localhost:5000/reviews/${props.review_id}/comments`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });

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
              <div key={idx} className="list-group-item list-group-item-action" id="postsItems">
                <small>{comment.nickname} a comentat la data de {comment.date_posted}:</small>
                <p>{comment.content}</p>
              </div>
            ); // <-- testare
          })}
        </div>
      </Modal.Body>

      {/* <Modal.Footer>
        <Button variant="primary" onClick={() => this.props.show = false}>Închide</Button>
      </Modal.Footer> */}
    </Modal >
  );
};