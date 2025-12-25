import { useEffect, useState } from "react";
import { fetchAllPosts, deletePost } from "../api/admin";
import { Link } from "react-router-dom";

export default function AdminHome() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchAllPosts()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res;
        setPosts(data);
      })
      .catch((err) => {
        console.error("ADMIN FETCH ERROR:", err);
      });
  }, []);

  const handleDelete = async (slug) => {
    if (!confirm("Delete this post?")) return;
    await deletePost(slug);
    setPosts((prev) => prev.filter((p) => p.slug !== slug));
  };

  return (
    <div className="admin-container">
      <h1>Writing Room</h1>

      <Link className="admin-new" to="/admin/edit/new">
        + New Post
      </Link>

      {posts.length === 0 && (
        <p style={{ color: "var(--text-secondary)" }}>
          No posts yet.
        </p>
      )}

      {posts.map((post) => (
      <div key={post.id} className="admin-post">
          <h2>{post.title}</h2>

          {!post.is_published && (
          <p
              style={{
              fontSize: "0.75rem",
              color: "#ffb4b4",
              marginTop: "4px",
              }}
          >
              draft
          </p>
          )}

          <p>{post.read_time ?? "–"} min read</p>

          <div className="admin-actions">
          <Link to={`/admin/edit/${post.slug}`}>Edit</Link>
          <button onClick={() => handleDelete(post.slug)}>
              Delete
          </button>
          </div>
      </div>
      ))}
    </div>
  );
}
