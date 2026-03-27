import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAdminPosts = () => API.get('/posts/');
export const createPost = (data) => API.post('/posts/', data);
export const updatePost = (slug, data) => API.put(`/posts/${slug}/`, data);
export const deletePost = (slug) => API.delete(`/posts/${slug}/`);
export const publishPost = (slug) => API.put(`/posts/${slug}/`, { is_published: true });

export const login = (password) => {
    const formData = new FormData();
    formData.append('username', 'admin'); 
    formData.append('password', password);
    
    return API.post('/login/', formData);
};