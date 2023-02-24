import { useNavigate } from 'react-router-dom'

export const Comment = ({ comment, token }) => {

  const navigate = useNavigate()

  return (
  <>
  {parseInt(token) === comment.user_id ? (
    <section className="comments__card">
      <h3>"{comment?.content}"</h3>
      <div className="comment__author">-{comment?.author?.full_name}</div>
      <button className="editButton"
        onClick={() => {
          navigate({ pathname: `${comment.id}/edit` })
        }}>Edit</button>
      <button className="deleteButton">Delete</button>
    </section >
    ): null}
  </>
  )
}


// const deleteWindow = () => {
//   if (window.confirm("Do you really want there to be one less potato post in the world?")){
//     deletePosts(postId).then(() => navigate("/posts"))
//   } else {
//     navigate(`/posts/${post.id}`)}
// }