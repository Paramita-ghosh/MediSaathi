import axios from "axios";

// Use Vite environment variable `VITE_API_URL` when available, otherwise fallback to localhost
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const getAuthConfig = () => {
  const token = localStorage.getItem("authToken");
  return {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), 
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
