import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCommentsByPostId } from "../../managers/comments"
import { getSinglePost } from "../../managers/Posts"
import { Comment } from "./Comment"
import "./comments.css"

export const CommentList = ({ token }) => {
  const [comments, setComments] = useState([])
  const [post, setPost] = useState([])
  const navigate = useNavigate()

  const { postId } = useParams()

  useEffect(() => {
    getCommentsByPostId(postId).then((postData) => setComments(postData))
  }, [])

  useEffect(() => {
    getSinglePost(postId).then((postData) => setPost(postData))
  }, [])

  return (
    <>
      <div className="comment">
        <tbody>
        <div class="commentBtn">
        <button className="button is-link is-rounded is-small" onClick={() => navigate(`/posts/${postId}/comment`)}>
                    ADD COMMENT
                  </button></div>
          <div className="comments_title">Comments for <i>{post.title}</i></div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </tbody>
      </div>
    </>
  )
}
