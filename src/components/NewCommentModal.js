import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { useState, useEffect, useRef } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Axios from "axios";

import "../css/comments.css";
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const NewCommentModal = (props) => {
  const navigate = useNavigate
  const location = useLocation();

  const queryClient = useQueryClient();
  const user = useSelector((state) => state.user.user);

  const [content, setContent] = useState("");

  const handleSubmit = async (e, navigate) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("content", content);
    params.append("review_id", props.review_id);
    params.append("author_id", user?.user_id);

    try {
      await Axios.post("https://localhost:5000/comments-api", params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log("Comment posted", params);

      // window.location.reload(); // Reload the page to see the new comment
      // window.location = window.location.href; // Reload the page to see the new comment
      queryClient.refetchQueries(["Comments", props.review_id]);
      setContent("");
      props.onHide();
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   console.log("NEW COMMENT MODAL FOR REVIEW ID", props.review_id);
  // }, [])

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Lasă un comentariu la postarea utilizatorului {props.review_author_nickname}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="comments">
        <form id="newPostForm" onSubmit={(e) => handleSubmit(e, navigate)}>
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