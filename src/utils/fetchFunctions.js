import Axios from "axios";

export const fetchAllComments = async function() {
    try {
      const result = await Axios.get(`http://localhost:5000/comments`);
      console.log(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
    }
};