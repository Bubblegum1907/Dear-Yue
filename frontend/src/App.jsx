import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import AdminHome from "./admin/AdminHome";
import EditPost from "./admin/EditPost";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />

        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/edit/:slug" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}
