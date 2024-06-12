import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

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
          Comentarii
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {isLoading && <p>Se încarcă comentariile...</p>}
        {error && <p>Eroare la încărcarea comentariilor</p>}
        {comments?.map((comment, idx) => {
          return (
            <div key={idx} className="list-group-item list-group-item-action" id="postsItems">
              <p>{comment.content}</p>
              <p>{comment.author_id}</p>
            </div>
          ); // <-- testare
        })}
      </Modal.Body>

      {/* <Modal.Footer>
        <Button variant="primary" onClick={() => this.props.show = false}>Închide</Button>
      </Modal.Footer> */}
    </Modal>
  );
};