import { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

    useEffect(() => {
    fetchPosts().then((data) => {
        console.log("POSTS FROM API:", data);
        setPosts(data);
    });
    }, []);

  return (
    <div className="container">
      <p style={{ color: "#9b8cff", letterSpacing: "2px", fontSize: "0.75rem" }}>
      ✦ Iba Shibli ✦
      </p>
      <h1>Dear Yue</h1>

        {posts.map((post) => (
        <Link
            key={post.id}
            to={`/post/${post.slug}`}
            className="post-link"
        >
            <div className="post-preview">
            <h2>{post.title}</h2>
            <p>{post.read_time} min read</p>
            </div>
        </Link>
        ))}
    </div>
  );
}
