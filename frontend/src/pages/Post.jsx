import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostBySlug } from "../api/posts";

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostBySlug(slug).then(setPost);
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.read_time} min read</p>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.rendered_content }}
      />
    </div>
  );
}
