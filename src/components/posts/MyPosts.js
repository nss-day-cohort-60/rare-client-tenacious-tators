import { useEffect, useState } from "react";
import "./MyPosts.css";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);

  const tokenInt = parseInt(token);
  useEffect(() => {
    fetch(`http://localhost:8088/posts?userId=${tokenInt}`)
      .then((res) => res.json())
      .then((postData) => {
        setPosts(postData);
      });
  }, []);
  return (
    <>
      <div className="post-card">
        <h1>{posts.title}</h1>
        <h3>{posts.publication_date}</h3>
        <img src={posts.image_url} alt="Post Description"></img>
      </div>
    </>
  );
};
