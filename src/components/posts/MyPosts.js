import React, { useEffect, useState } from "react";
import { getCurrentUserPosts } from "../../managers/Posts";
import "./Posts.css";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const tokenInt = parseInt(token);

  useEffect(() => {
    getCurrentUserPosts(tokenInt).then((postData) => {
      setPosts(postData);
    });
  }, []);

  return (
    <div className="user-posts">
      {posts.map((post) => (
        <>
          <h1>{post.title}</h1>
          <h2>{post?.user?.username}</h2>
          <h3>{post?.category?.label}</h3>
          <h3>{post.publication_date}</h3>
          <p>{post.content}</p>

          <div className="buttons">
            <button onClick={() => {}}>DELETE</button>
            <button onClick={() => {}}>EDIT</button>
          </div>
        </>
      ))}
    </div>
  );
};
