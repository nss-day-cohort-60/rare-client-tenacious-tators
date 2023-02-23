import { Link, useNavigate } from "react-router-dom"
import { getTags, deleteTag } from "../../managers/tags.js"
import "./Tag.css"

export const Tag = ({ tag, setterFunction }) => {
    const navigate = useNavigate()

    const deleteButton = (id) => {
        return <button onClick={() => {
            deleteTag(id)
            .then(() => {
                getTags().then((data) => setterFunction(data))}) 
        }} className="deleteButton">Delete</button>
    }

    return(
        <article className="tags__individual">
            <div>
                <h3>{tag.label}</h3>
                <button className="editButton"
                    onClick={() => {
                        navigate({ pathname: `edit/${tag.id}` })
                        }}>Edit</button>
                {deleteButton(tag.id)}
            </div>
        </article>
    )
}