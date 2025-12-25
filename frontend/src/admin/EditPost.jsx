import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/admin";
import { fetchPostBySlug } from "../api/posts";
import PostForm from "./PostForm";

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (slug !== "new") {
      fetchPostBySlug(slug).then(setPost);
    }
  }, [slug]);

  const handleSave = async (data) => {
    if (slug === "new") {
      await createPost(data);
    } else {
      await updatePost(slug, data);
    }
    navigate("/admin");
  };

  return (
    <div className="container">
      <h1>{slug === "new" ? "New Post" : "Edit Post"}</h1>
      <PostForm post={post} onSave={handleSave} />
    </div>
  );
}
