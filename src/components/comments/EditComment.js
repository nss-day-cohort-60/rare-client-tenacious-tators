import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { updateComment, getCommentsByPostId } from '../../managers/comments.js'

export const EditComment = () => {

    const { commentId, postId } = useParams()
    const navigate = useNavigate()

    const [currentComment, setCurrentComment] = useState({ 
        post: postId,
        content: ""
    })

    useEffect(() => {
        getCommentsByPostId(commentId).then((data) => {
            data.commentId = data.id
            setCurrentComment(data[0])
        })
    }, [commentId])

    const changeCommentState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentComment }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentComment(copy)
    }

    return (
        <form>
            <section className="comments__card">
                <h2 className="commentHeader">Update Your Comment</h2>
                <fieldset>
                    <div className="form-group">
                        <textarea
                            type="text"
                            rows="10"
                            cols="30"
                            value={currentComment.content}
                            required
                            autoFocus
                            className="form-control"
                            onChange={changeCommentState}
                        />
                    </div>
                </fieldset>
                <button type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        const commentToUpdate = {
                            content: currentComment.content
                        }
                        updateComment(commentToUpdate, commentId)
                            .then(() => navigate(`/posts/${postId}/comments`))
                    }}
                    className="btn btn-primary">Publish</button>
            </section >
        </form>
    )
}