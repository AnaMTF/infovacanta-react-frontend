import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import "../css/comments.css";

export const NewCommentModal = (props) => {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Lasă un comentariu la postarea utilizatorului {props.review_author_nickname}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="comments">
        <form id="newPostForm" method="post" action="/reviews">
          <textarea
            name="content"
            placeholder="Scrieți comentariul dumneavoastră aici..."
            required
            rows="3"
          ></textarea>
          <button className="full-width" type="submit" id="publicaBtn">Publică</button>
        </form>
      </Modal.Body>
    </Modal >
  );
};