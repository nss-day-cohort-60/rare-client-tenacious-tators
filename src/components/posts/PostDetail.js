import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getSinglePost } from "../../managers/Posts";
import { deletePosts } from "../../managers/Posts";
import { PostReactions } from "../reactions/PostReactions";
import "./Posts.css";
import { getUsers } from "../../managers/users";


export const PostDetail = ({ token }) => {
  const [post, setPost] = useState({})
  const { postId } = useParams()
  const [users, setUsers] = useState([])
//   const [postTags, setPostTags] = useState(new Set())
//   const [currentPost, setCurrentPost] = useState({
//     categoryId: 0,
//     title: "",
//     image_url: "",
//     content: "",
//     user_id: parseInt(token),
//     tags: [],
//     approved: 0
//   });

//   const tagArr = (tagId) => {
//     let copy = new Set(postTags)
//     copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
//     setPostTags(copy)
// }

//   useEffect(() => {
//       getSinglePost(postId).then((data) => {
//           setCurrentPost(data)

//           const tagSet = new Set()
//           for (const tag of data.tags) {
//               tagSet.add(tag.id)
//           }
//           setPostTags(tagSet)
//       })
//   }, [postId])


  useEffect(() => {
    getUsers().then((usersData) => setUsers(usersData))
  }, [])
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
              <div class="title is-3">{post.title}</div>
              <div>Published On: {post?.publication_date}</div>
            </section>
          </span>
          <Link to={`/users/${post?.author?.id}`}>
            <h2>{post?.author?.full_name}</h2>
          </Link>
          <h3>{post?.category?.label}</h3>
          {/* <h3>{currentPost.tagArr}</h3> */}
          <img className="myposts__image" src={post?.image_url} />
          <section className="myposts__postbody">
            <p>{post.content}</p>
          </section>
      <section className="myposts__footer">
          {post.writer ? (
            <div className="buttons">
              <button class="button is-danger is-rounded is-small"
                onClick={(e) => {
                  e.preventDefault()
                  deleteWindow()
                }}
              >
                DELETE
              </button>
              <button class="button is-rounded is-small"
                onClick={() => {
                  navigate(`/posts/editpost/${post.id}`)
                }}
            
              >
                EDIT
              </button>
              <button class="button is-link is-rounded is-small" onClick={() => navigate(`/posts/${postId}/comments`)}>
                VIEW COMMENTS
              </button>
              <button class="button is-link is-rounded is-small" onClick={() => navigate(`/posts/${postId}/comment`)}>
                ADD COMMENT
              </button>
            </div>
          ) : (
            <div className="buttons">
              <button class="button is-link is-rounded is-small" onClick={() => navigate(`/posts/${postId}/comments`)}>
                VIEW COMMENTS
              </button>
              <button class="button is-link is-rounded is-small" onClick={() => navigate(`/posts/${postId}/comment`)}>
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
