import { useEffect, useState } from "react";
import { getAdminPosts, deletePost, updatePost } from "../api/admin"; 
import { Link, useNavigate } from "react-router-dom";

export default function AdminHome() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    getAdminPosts()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res;
        setPosts(data);
      })
      .catch((err) => {
        console.error("ADMIN FETCH ERROR:", err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      });
  }, [navigate]);

  const handleTogglePublish = async (slug, currentStatus) => {
    try {
      // Assuming updatePost handles partial updates for is_published
      await updatePost(slug, { is_published: !currentStatus });
      setPosts((prev) =>
        prev.map((p) => (p.slug === slug ? { ...p, is_published: !currentStatus } : p))
      );
    } catch (err) {
      console.error("TOGGLE ERROR:", err);
    }
  };

  const openDeleteModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPost) return;
    try {
      await deletePost(selectedPost.slug);
      setPosts((prev) => prev.filter((p) => p.slug !== selectedPost.slug));
      setIsModalOpen(false);
      setSelectedPost(null);
    } catch (err) {
      console.error("DELETE ERROR:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      {/* Top Header Row with Logout at the original right side */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem' 
      }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", margin: 0 }}>
          Writing Room
        </h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <Link className="admin-new" to="/admin/edit/new" style={{ marginBottom: '2rem', display: 'inline-block' }}>
        + New Post
      </Link>

      <main className="admin-list">
        {posts.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.4)", marginTop: '3rem' }}>
            The stars are quiet. No memories yet.
          </p>
        )}

        {posts.map((post) => (
          <div key={post.id} className="admin-post" style={{ position: 'relative' }}>
            
            {/* Corner Status Toggle (Publish/Live) */}
            <button 
              className={`btn-status-glow ${post.is_published ? 'is-live' : 'is-draft'}`}
              onClick={() => handleTogglePublish(post.slug, post.is_published)}
            >
              {post.is_published ? 'Live' : 'Publish'}
            </button>

            <h2>{post.title}</h2>

            {!post.is_published && (
              <span className="draft-indicator">
                • Draft
              </span>
            )}
            <p className="post-meta">{post.read_time ?? "–"} min read</p>

            <div className="admin-actions">
              <Link to={`/admin/edit/${post.slug}`} className="btn-moonlight-action">
                Edit
              </Link>
              <button 
                className="btn-moonlight-action delete" 
                onClick={() => openDeleteModal(post)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </main>

      <DeleteModal 
        isOpen={isModalOpen} 
        postTitle={selectedPost?.title}
        onCancel={() => setIsModalOpen(false)} 
        onConfirm={confirmDelete} 
      />
    </div>
  );
}

const DeleteModal = ({ isOpen, onCancel, onConfirm, postTitle }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Release this memory?</h3>
        <p>Are you sure you want to delete "{postTitle}"?</p>
        <div className="modal-buttons">
          <button className="btn-ghost" onClick={onCancel}>Keep it</button>
          <button className="btn-moonlight" onClick={onConfirm}>Let it go</button>
        </div>
      </div>
    </div>
  );
};