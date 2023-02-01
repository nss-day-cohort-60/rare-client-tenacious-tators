import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePosts, getCurrentUserPosts } from "../../managers/Posts";
import "./Posts.css";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const tokenInt = parseInt(token);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUserPosts(tokenInt).then((postData) => {
      setPosts(postData);
    });
  }, []);

  const deleteWindow = (postId) => {
    if (window.confirm("Do you really want there to be one less potato post in the world?")){
      deletePosts(postId).then(() => navigate("/posts/myposts"))
    } else {
      navigate(`/posts/myposts`)}
  }

  return (
    <div className="user-posts">
      {posts.map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <h2>{post?.user?.username}</h2>
          <h3>{post?.category?.label}</h3>
          <h3>{post.publication_date}</h3>
          <p>{post.content}</p>

          <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteWindow(post.id)
            }}
          >DELETE
          </button>
            <button
              onClick={() => {
                navigate(`/posts/editpost/${post.id}`);
              }}
            >
              EDIT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
