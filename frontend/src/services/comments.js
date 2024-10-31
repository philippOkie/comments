import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_BASE_URL;

const getAllComments = async () => {
  const response = await axios.get(`${BASE_URL}/comments`);

  return response.data;
};

const getCommentReplies = async (id) => {
  const response = await axios.get(`${BASE_URL}/comments/${id}`);

  return response.data;
};

export default { getAllComments, getCommentReplies };
