process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // This is a temporary fix for the self-signed certificate issue. It should be removed in production.
import Axios from "axios";
import { config } from "../config";

const namespace = 'infovacanta-react';

export const updateUpvotes = async function (reviewId) {
  try {
    const response = await Axios.get(`http://api.lyket.dev/v1/updown-buttons/${namespace}/review-upvotes-${reviewId}`, config)
    await Axios.post(`https://localhost:5000/update-upvotes/${reviewId}`, { value: response.data?.total_score });
  } catch (error) {
    console.error(error);
  }
}

export const updateRating = async function (reviewId) {
  try {
    const response = await Axios.get(`http://api.lyket.dev/v1/rate-buttons/${namespace}/review-${reviewId}`, config)
    await Axios.post(`https://localhost:5000/update-rating/${reviewId}`, { value: response.data?.average_rating });
  } catch (error) {
    console.error(error);
  }
}