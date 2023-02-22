import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getTagById, updateTag } from '../../managers/tags.js'

export const EditTag = () => {
    const navigate = useNavigate()
    // const [tag, setTag] = useState([])
    const { tagId } = useParams()

    const [currentTag, setCurrentTag] = useState({
        label: ""
    })

    useEffect(() => {
        getTagById(tagId).then((data) => {
            data.tagId = data.id
            setCurrentTag(data)
        })
    }, [tagId])

    const changeTagState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentTag }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentTag(copy)
    }

    return (
        <form className="tagForm">
            <h2 className="tagForm__title">Update Tag</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Label: </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        value={currentTag.label}
                        onChange={changeTagState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const tag = {
                        label: currentTag.label
                    }

                    // Send POST request to your API
                    updateTag(tag, tagId)
                        .then(() => navigate("/tags"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}