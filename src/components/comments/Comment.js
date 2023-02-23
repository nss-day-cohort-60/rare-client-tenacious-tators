
import { useNavigate } from 'react-router-dom'

export const Comment = ({ comment }) => {

  const navigate = useNavigate()

  return (<>
    <section className="comments__card">
      <h3>"{comment?.content}"</h3>
      <div className="comment__author">-{comment?.author?.full_name}</div>
      <button className="editButton"
        onClick={() => {
          navigate({ pathname: `${comment.id}/edit` })
        }}>Edit</button>
      <button className="deleteButton">Delete</button>
    </section ></>)
};
