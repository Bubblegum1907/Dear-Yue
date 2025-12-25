import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchPosts = async () => {
  const res = await API.get("/posts/");
  return res.data;
};

export const fetchPostBySlug = async (slug) => {
  const res = await API.get(`/posts/${slug}`);
  return res.data;
};
