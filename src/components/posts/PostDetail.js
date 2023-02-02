import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSinglePost } from "../../managers/Posts";
import { deletePosts } from "../../managers/Posts";
import { HumanDate } from "../utils/HumanDate";
import "./Posts.css";

export const PostDetail = ({ token }) => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId).then(setPost);
  }, [, postId]);

  const deleteWindow = () => {
    if (window.confirm("Do you really want there to be one less potato post in the world?")){
      deletePosts(postId).then(() => navigate("/posts"))
    } else {
      navigate(`/posts/${post.id}`)}
  }

  return (
    <article className="posts__container">
    <div className="single-my-post">
      <img className="myposts__image" src={post?.image_url}/>
      <section className="myposts__content">
                  <span style={{ fontWeight: 'bold' }}>
                  <section className="subscribe__postheader"><div>{post.title}</div><div>Published On: {post?.publication_date}</div></section></span>
      <Link to={`/users/${post.user_id}`}>
        <h2>{post?.author?.username}</h2>
      </Link>
      <h3>{post?.category?.label}</h3>
      <section className="myposts__postbody"><p>{post.content}</p></section>
            {parseInt(token) === post.user_id ? (
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              deleteWindow()
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
          <button onClick={() => navigate(`/posts/${postId}/comments`)}>
            VIEW COMMENTS
          </button>
        </div>
      ) : (
        ""
      )}
      </section>
    </div>
    </article>
  );
};

//click on user name, it should be routed to user detail
