import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/admin";
import { fetchPostBySlug } from "../api/posts";
import PostForm from "./PostForm";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const isNew = slug === "new";

  useEffect(() => {
    if (!isNew) {
      fetchPostBySlug(slug)
        .then((res) => {
          const data = res.data || res;
          setPost(data);
        })
        .catch((err) => {
          console.error("FETCH ERROR:", err);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
  }, [slug, navigate, isNew]);

  const handleSave = async (data) => {
    try {
      if (isNew) {
        await createPost(data);
      } else {
        await updatePost(slug, data);
      }
      navigate("/admin");
    } catch (err) {
      console.error("SAVE ERROR:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert("The stars are misaligned. Failed to save memory.");
      }
    }
  };

  return (
    <div className="admin-container">
      <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
        {isNew ? "New Memory" : "Edit Memory"}
      </h1>
      
      {(isNew || post) ? (
        <PostForm post={post} onSave={handleSave} />
      ) : (
        <p style={{ color: "var(--text-secondary)" }}>Recalling memory...</p>
      )}
    </div>
  );
}