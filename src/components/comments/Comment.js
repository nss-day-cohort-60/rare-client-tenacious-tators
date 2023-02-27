
import { useNavigate } from 'react-router-dom'
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export const Comment = ({ comment }) => {

  const navigate = useNavigate()

  return (

    <section className="comments__card">
      <div className="comment__author"> <img className="comment__image" src={comment?.author?.profile_image_url} /> {comment?.author?.full_name} </div>
      {comment.writer ? <>
        <div className="comment_content"><FaEdit className="grey-buttons edit_comment" onClick={() => {
          navigate({ pathname: `${comment.id}/edit` });
        }}/>{comment?.content}</div></>

        : <div className="comment__content">{comment?.content}</div>

      }
    </section>
  )
};
