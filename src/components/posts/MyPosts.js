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
                  <section className="subscribe__postheader">
                    <div class="title is-2" className="postHeader">{post.title}</div>
                    <div>
                      Published On: <HumanDate date={post.publication_date} />
                    </div>
                  </section>
                </span>
                <h2>
                  Author:{" "}
                  <Link to={`/users/${post.author.id}`}>
                    {post?.author?.full_name}
                  </Link>
                </h2>
                <h3> Category: {post?.category?.label}</h3>
                <h3>{post?.tags?.label}</h3>
                <img className="myposts__image" src={post?.image_url} />
                <section className="myposts__postbody">
                  <p>{post.content}</p>
                </section>
                <div className="myposts__footer">
                  <div className="buttons">
                    <button class="button is-small"
                      onClick={() => navigate(`/posts/${post.id}/comments`)}
                    >
                      View Comments
                    </button>
                    <button class="button is-small" onClick={() => navigate(`/posts/${post.id}/comment`)}>
                      Add Comment
                    </button>
                    <button class="button is-small"
                      onClick={() => {
                        navigate(`/posts/editpost/${post.id}`)
                      }}
                    >
                      Edit Post
                    </button>
                    <button class="button is-small"
                      onClick={(e) => {
                        e.preventDefault()
                        deleteWindow(post.id)
                      }}
                    >
                      Delete Post
                    </button>
                  </div>
                  <section>
                    <PostReactions postId={post.id} />
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
