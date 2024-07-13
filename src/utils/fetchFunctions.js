process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // This is a temporary fix for the self-signed certificate issue. It should be removed in production.

import Axios from "axios";
import getDistanceFromLatLonInKm from "./trigonometryFunctions";

export const fetchAllComments = async function () {
  try {
    const result = await Axios.get(`https://localhost:5000/comments`);
    //console.log("All comments fetched:\n", result.data);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchCommentsByReviewId = async function (reviewId) {
  try {
    const response = await Axios.get(`https://localhost:5000/reviews/${reviewId}/comments`);
    //console.log("Comments for review " + reviewId + " fetched:\n", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchDestinations = async function () {
  try {
    const response = await Axios.get(`https://localhost:5000/destinations`);
    //console.log("All destinations fetched:\n", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchNextReviewId = async function () {
  try {
    const response = await Axios.get("https://localhost:5000/next-val/reviews");
    //console.log("NEXT REVIEW ID ESTE", response.data)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchReviewsByUserId = async function (userId, sortType, geolocation) {
  try {
    const result = await Axios.get(`https://localhost:5000/users/${userId}/review-cards`);
    //console.log("Reviews by user" + userId + "fetched:\n", result.data);

    switch (sortType) {
      case 'newest_first':
        return result.data;
      case 'oldest_first':
        return result.data.reverse();
      case 'most_upvotes':
        return result.data.sort((a, b) => b.upvotes - a.upvotes);
      case 'best_rating':
        return result.data.sort((a, b) => b.rating - a.rating);
      case 'closest':
        return result.data.sort((a, b) => {
          const distanceA = getDistanceFromLatLonInKm(a.lat, a.lon, geolocation.latitude, geolocation.longitude);
          const distanceB = getDistanceFromLatLonInKm(b.lat, b.lon, geolocation.latitude, geolocation.longitude);
          return distanceA - distanceB;
        });
    }

    return result.data;
  } catch (error) {
    console.error(error);
  }
};

// export const fetchAllReviews = async function () {
//   try {
//     const result = await Axios.get("https://localhost:5000/review-cards");
//     //console.log(result.data);
//     return result.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

export const fetchAllReviews = async function (sortType, geolocation) {
  try {
    const result = await Axios.get("https://localhost:5000/review-cards");

    console.log("function fetchAllReviews called.");
    console.log("geolocation:", geolocation)
    console.log("sortType:", sortType);

    switch (sortType) {
      case 'newest_first':
        return result.data;
      case 'oldest_first':
        return result.data.reverse();
      case 'most_upvotes':
        return result.data.sort((a, b) => b.upvotes - a.upvotes);
      case 'best_rating':
        return result.data.sort((a, b) => b.rating - a.rating);
      case 'closest':
        return result.data.sort((a, b) => {
          const distanceA = getDistanceFromLatLonInKm(a.lat, a.lon, geolocation.latitude, geolocation.longitude);
          const distanceB = getDistanceFromLatLonInKm(b.lat, b.lon, geolocation.latitude, geolocation.longitude);
          return distanceA - distanceB;
        });
    }

    return result.data;
  } catch (error) {
    console.error("Error.", error);
    return null;
  }
};

export const fetchUserStatisticsById = async function (userId) {
  try {
    const result = await Axios.get(`https://localhost:5000/query/users/${userId}/statistics`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUserInfoById = async function (userId) {
  try {
    const result = await Axios.get(`https://localhost:5000/users/${userId}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchQueryResultsByKeyword = async function (keyword) {
  try {
    const result = await Axios.get(`https://localhost:5000/query/${keyword}`);
    // console.log(result.data);
    return result.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};