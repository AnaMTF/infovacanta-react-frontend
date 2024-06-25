import Axios from "axios";

export const fetchAllComments = async function () {
  try {
    const result = await Axios.get(`http://localhost:5000/comments`);
    console.log("All comments fetched:\n", result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCommentsByReviewId = async function (reviewId) {
  try {
    const response = await Axios.get(`http://localhost:5000/reviews/${reviewId}/comments`);
    console.log("Comments for review " + reviewId + " fetched:\n", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDestinations = async function () {
  try {
    const response = await Axios.get(`http://localhost:5000/destinations`);
    console.log("All destinations fetched:\n", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchNextReviewId = async function () {
  try {
    const response = await Axios.get("http://localhost:5000/next-val/reviews");
    console.log("NEXT REVIEW ID ESTE", response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchReviewsByUserId = async function (userId) {
  try {
    const result = await Axios.get(`http://localhost:5000/users/${userId}/review-cards`);
    console.log("Reviews by user" + userId + "fetched:\n", result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchAllReviews = async function () {
  try {
    const result = await Axios.get("http://localhost:5000/review-cards");
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchUserStatisticsById = async function (userId) {
  try {
    const result = await Axios.get(`http://localhost:5000/query/users/${userId}/statistics`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserInfoById = async function (userId) {
  try {
    const result = await Axios.get(`http://localhost:5000/users/${userId}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchQueryResultsByKeyword = async function (keyword) {
  try {
    const result = await Axios.get(`http://localhost:5000/query/${keyword}`);
    // console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};