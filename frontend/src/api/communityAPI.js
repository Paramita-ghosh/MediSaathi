import axios from "axios";

const API_BASE = "http://localhost:5000"; // ✅ backend URL

// ✅ Helper to always fetch the latest token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // only if token exists
    },
    withCredentials: true,
  };
};

export const getPosts = async () => {
  const { data } = await axios.get(`${API_BASE}/api/community`);
  return data;
};

export const createPost = async (postData) => {
  const { data } = await axios.post(
    `${API_BASE}/api/community`,
    postData,
    getAuthConfig()
  );
  return data;
};

export const likePost = async (id) => {
  const { data } = await axios.put(
    `${API_BASE}/api/community/${id}/like`,
    {},
    getAuthConfig()
  );
  return data;
};
