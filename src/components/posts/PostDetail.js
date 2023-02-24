import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSinglePost } from "../../managers/Posts";
import { deletePosts } from "../../managers/Posts";
import { PostReactions } from "../reactions/PostReactions";
import { HumanDate } from "../utils/HumanDate";
import "./Posts.css";

export const PostDetail = ({ token }) => {
  const [post, setPost] = useState({})
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getSinglePost(postId).then(setPost)
  }, [, postId])

  const deleteWindow = () => {
    if (
      window.confirm(
        "Do you really want there to be one less potato post in the world?"
      )
    ) {
      deletePosts(postId).then(() => navigate("/posts"))
    } else {
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <article className="posts__container">
      <div className="single-my-post">
        <section className="myposts__content">
          <span style={{ fontWeight: "bold" }}>
            <section className="subscribe__postheader">
              <div>{post.title}</div>
              <div>Published On: {post?.publication_date}</div>
            </section>
          </span>
          <Link to={`/users/${post.author_id}`}>
            <h2>{post?.author?.full_name}</h2>
          </Link>
          <h3>{post?.category?.label}</h3>
          <img className="myposts__image" src={post?.image_url} />
          <section className="myposts__postbody">
            <p>{post.content}</p>
          </section>
      <section className="myposts__footer">
          {post.writer ? (
            <div className="buttons">
              <button class="button is-small"
                onClick={(e) => {
                  e.preventDefault()
                  deleteWindow()
                }}
              >
                DELETE
              </button>
              <button class="button is-small"
                onClick={() => {
                  navigate(`/posts/editpost/${post.id}`)
                }}
            
              >
                EDIT
              </button>
              <button class="button is-small" onClick={() => navigate(`/posts/${postId}/comments`)}>
                VIEW COMMENTS
              </button>
              <button class="button is-small" onClick={() => navigate(`/posts/${postId}/comment`)}>
                ADD COMMENT
              </button>
            </div>
          ) : (
            <div className="buttons">
              <button class="button is-small" onClick={() => navigate(`/posts/${postId}/comments`)}>
                VIEW COMMENTS
              </button>
              <button class="button is-small" onClick={() => navigate(`/posts/${postId}/comment`)}>
                ADD COMMENT
              </button>
            </div>
          )}
      
      <section>
        <PostReactions postId={postId}/>
      </section>
      </section>
        </section>
      </div>
    </article>
  )
}

//click on user name, it should be routed to user detail
