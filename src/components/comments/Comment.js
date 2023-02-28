
import { useNavigate, useParams } from 'react-router-dom'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { deleteComment, getCommentsByPostId } from '../../managers/comments';

export const Comment = ({ comment, setterFunction }) => {
  const {postId} = useParams()

  const navigate = useNavigate()

  const deleteButton = (id) => {
    return <FaTrashAlt onClick={() => {
        deleteComment(id)
        .then(() => {
            getCommentsByPostId(postId).then((data) => setterFunction(data))}) 
    }} />} 

  return (

    <section className="comments__card">
      <div className="comment__author"> <img className="comment__image" src={comment?.author?.profile_image_url} /> {comment?.author?.full_name} </div>
      {comment.writer ? <>
        <div>
          <div className="comment_content">{comment?.content}</div>
          <div className="buttons grey-buttons"><FaEdit className="edit_comment" onClick={() => {
            navigate({ pathname: `${comment.id}/edit` });
          }}/>
          {deleteButton(comment.id)}
          </div>
        </div>
        </>

        : <div className="comment__content">{comment?.content}</div>

      }
    </section>
  )
};
