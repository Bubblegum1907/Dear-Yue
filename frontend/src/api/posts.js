import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const fetchPosts = async () => {
  const res = await API.get("/posts/");
  return res.data;
};

export const fetchPostBySlug = async (slug) => {
  const res = await API.get(`/posts/${slug}`);
  return res.data;
};
