import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

const ADMIN_KEY = import.meta.env.VITE_ADMIN_KEY;

export const createPost = (data) =>
  API.post("/posts/", data, {
    headers: { "X-ADMIN-KEY": ADMIN_KEY },
  });

export const updatePost = (slug, data) =>
  API.put(`/posts/${slug}`, data, {
    headers: { "X-ADMIN-KEY": ADMIN_KEY },
  });

export const deletePost = (slug) =>
  API.delete(`/posts/${slug}`, {
    headers: { "X-ADMIN-KEY": ADMIN_KEY },
  });

export const fetchAllPosts = () =>
  API.get("/posts/");
