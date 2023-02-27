
import { useNavigate } from 'react-router-dom'

export const Comment = ({ comment }) => {

  const navigate = useNavigate()

  return (

    <section className="comments__card">
      <div className="comment__author"><img className="comment__image" src={comment?.author?.profile_image_url}/> {comment?.author?.full_name}</div>
      <div className="comment__content">"{comment?.content}"</div>
      {comment.writer ?
        <div>
          <button className="button is-rounded is-small"
            onClick={() => {
              navigate({ pathname: `${comment.id}/edit` });
            }}
          >
            Edit
          </button></div>
        : ""

      }
    </section>
  )
};
