import React from "react";

import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";

import Axios from "axios";

import { Review } from "../components/Review";
import { AllCommentsModal } from "../components/AllCommentsModal";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchAllComments, fetchAllReviews } from "../utils/fetchFunctions";


export const SavedReviews = () => {

  const user = useSelector((state) => state.user.user);
  const { data: reviews } = useQuery(["Review Cards"], async () => fetchAllReviews());

  return (
    <div className="container-fluid jumbotron centered">
      <h1>Recenzii salvate</h1>
      <ul id="postsList" className="list-group">
        {reviews?.filter((review) => user?.saved_reviews.includes(review.review_id)).map((review, idx) => {
          const comments = allComments?.filter(comment => comment.review_id == review.review_id);
          const showComments = showCommentsHashMap[review.review_id] || false;

          //console.log("Comments for review", review.review_id, comments)

          return (
            <div key={idx}>
              <Review
                loggedInUserId={user?.user_id}
                content={review}
                toggleShowComments={toggleShowComments}
              ></Review>
              {/* <AllCommentsModal
                content={comments}
                show={showComments} onHide={() => toggleShowComments(review.review_id)}
              ></AllCommentsModal> */}
            </div>
          );
        })}
      </ul>
    </div>
  );
};