import "../css/styles.css";
import "../css/header.css";
import "../css/main.css";

import Axios from "axios";

import { Review } from "./Main";

import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";


export const SavedReviews = () => {
  const user = useSelector((state) => state.user.user);
  const { data: reviews } = useQuery(["reviews"], async () => {
    try {
      const result = await Axios.get(`http://localhost:5000/review-cards`);
      return result.data;
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <div className="container-fluid jumbotron centered">
      <h1>Recenzii salvate</h1>
      <ul id="postsList" className="list-group">
        {reviews?.filter((review) => user?.saved_reviews.includes(review.review_id)).map((review, idx) => {
          return (
            <Review loggedInUserId={user?.user_id} key={idx} content={review}></Review>
          );
        })}
      </ul>
    </div>
  );
};