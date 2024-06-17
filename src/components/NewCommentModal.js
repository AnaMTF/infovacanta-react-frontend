import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState, useEffect, useRef } from 'react';
import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

import "../css/comments.css";
import { useSelector } from 'react-redux';

export const NewCommentModal = (props) => {
  const user = useSelector((state) => state.user.user);

  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    const params = new URLSearchParams();
    params.append("content", content);
    params.append("review_id", props.review_id);
    params.append("author_id", user?.user_id);

    try {
      await Axios.post("http://localhost:5000/comments-api", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Lasă un comentariu la postarea utilizatorului {props.review_author_nickname}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="comments">
        <form id="newPostForm" onSubmit={handleSubmit}>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
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