import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePosts, getCurrentUserPosts } from "../../managers/Posts";
import { HumanDate } from "../utils/HumanDate";
import "./Posts.css";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const tokenInt = parseInt(token);
  const navigate = useNavigate();

  const getMyPosts = () => {
    getCurrentUserPosts(tokenInt).then((postData) => {
      setPosts(postData);
    })
  }

  useEffect(() => {
    getMyPosts();
  }, []);

  const deleteWindow = (postId) => {
    if (window.confirm("Do you really want there to be one less potato post in the world?")){
      deletePosts(postId).then(() => {
        {getMyPosts()}})
    } else {
      navigate(`/posts/myposts`)}
  }

  return (
    <article className="posts__container">
      <section className="posts__myposts">
        {/* <div className="user-posts"> */}
          {posts.map((post) => (
            <div key={post.id} className="single-my-post">
               <img className="myposts__image" src={post?.image_url}/>
               <section className="myposts__content">
                  <span style={{ fontWeight: 'bold' }}>
                  <section className="subscribe__postheader"><div>{post.title}</div><div>Published On: <HumanDate date={post.publication_date}/></div></section></span>
                    <h2>Author: <Link to={`/users/${post.user.id}`}>{post?.user?.username}</Link></h2>
                    <h3>{post?.category?.label}</h3>
                    <h3>{post?.tag?.label}</h3>
                    <section className="myposts__postbody"><p>{post.content}</p></section>
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
                </section>
            </div>
      ))}
    {/* </div> */}
    </section>
    </article>
  );
};
