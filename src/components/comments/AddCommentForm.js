import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { createNewComment } from "../../managers/comments"

export const AddCommentForm = ({ token }) => {
    const { postId } = useParams()
    const [comment, setComment] = useState({
        post: postId,
        content: ""
    })
    const navigate = useNavigate()

    const handleNewComment = (event) => {
        const newComment = Object.assign({}, comment)
        newComment[event.target.name] = event.target.value
        setComment(newComment)
    }

    const handleClick = () => {
        createNewComment(comment).then(() => navigate(`/posts/${postId}`))
    }
    return (
        <form className="addNewTagForm">
            <h2>Add New Comment</h2>
            <fieldset>
                <div className="form-group">
                    <input
                        type="text"
                        name="content"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Comment"
                        onChange={handleNewComment}
                    />
                </div>
            </fieldset>
            <button
                type="publish"
                onClick={(evt) => {
                    evt.preventDefault()
                    handleClick()
                }}
                className="publishButton"
            >
                Add Comment
            </button>
        </form>
    )
}