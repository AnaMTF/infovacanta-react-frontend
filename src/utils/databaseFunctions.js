process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // This is a temporary fix for the self-signed certificate issue. It should be removed in production.
import Axios from "axios";

export const updateUpvotes = async function (reviewId, value) {
  try {
    await Axios.post(`https://localhost:5000/update-upvotes/${reviewId}`, { value: value });
  } catch (error) {
    console.error(error);
  }
}

export const updateRating = async function (reviewId, value) {
  try {
    await Axios.post(`https://localhost:5000/update-rating/${reviewId}`, { value: value });
  } catch (error) {
    console.error(error);
  }
}