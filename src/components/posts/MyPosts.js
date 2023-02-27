import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePosts, getCurrentUserPosts } from "../../managers/Posts";
import { PostReactions } from "../reactions/PostReactions";
import { HumanDate } from "../utils/HumanDate";
import "./Posts.css";

export const MyPosts = ({ token }) => {
  const [posts, setPosts] = useState([])
  // const tokenInt = parseInt(token);
  const navigate = useNavigate()

  const getMyPosts = () => {
    getCurrentUserPosts().then((postData) => {
      setPosts(postData)
    })
  }

  useEffect(() => {
    getMyPosts()
  }, [])

  const deleteWindow = (postId) => {
    if (
      window.confirm(
        "Do you really want there to be one less potato post in the world?"
      )
    ) {
      deletePosts(postId).then(() => {
        {
          getMyPosts()
        }
      })
    } else {
      navigate(`/posts/myposts`)
    }
  }

  return (
    <article className="posts__container">
      <section className="posts__myposts">
        <div className="user-posts">
          {posts.map((post) => (
            <div key={post.id} className="single-my-post">
              <section className="myposts__content">
                <span style={{ fontWeight: "bold" }}>
                  <div className="myposts_category"><Link to={`/categories/${post.category.id}`}>{post?.category?.label}</Link></div>
                  <section className="subscribe__postheader">
                    <div className="posts_title">{post.title}</div>
                    <div className="posts_author">
                  Author:{" "}
                  <Link to={`/users/${post?.author?.id}`}>
                    {post?.author?.full_name}
                  </Link>
                  </div>
                    <div className="posts_date">
                      <HumanDate date={post.publication_date} /> | <Link to={`/posts/${post.id}/comments`}>💬 Comments</Link>
                    </div>
                  </section>
                </span>
                <h3>{post?.tag?.label}</h3>
                <img className="myposts__image" src={post?.image_url} />
                <section className="myposts__postbody">
                  <p>{post.content}</p>
                </section>
                <div className="myposts__footer">
                  <button className="buttons"
                    onClick={(e) => {
                      e.preventDefault()
                      deleteWindow(post.id)
                    }}
                  >
                    DELETE
                  </button>
                  <button className="buttons"
                    onClick={() => {
                      navigate(`/posts/editpost/${post.id}`)
                    }}
                  >
                    EDIT
                  </button>
                  <button className="buttons"
                    onClick={() => navigate(`/posts/${post.id}/comments`)}
                  >
                    VIEW COMMENTS
                  </button>
                  <button className="buttons" onClick={() => navigate(`/posts/${post.id}/comment`)}>
                    ADD COMMENT
                  </button>
                <section>
        <PostReactions className="buttons" postId={post.id}/>
      </section>
                </div>
              </section>
            </div>
          ))}
        </div>
      </section>
    </article>
  )
}
