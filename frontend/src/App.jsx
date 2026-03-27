import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Login';
import AdminHome from './admin/AdminHome';
import EditPost from './admin/EditPost';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/edit/:slug" 
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          } 
        />

        <Route path="/admin/*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}