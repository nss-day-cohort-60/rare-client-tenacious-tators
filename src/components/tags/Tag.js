import { Link, useNavigate } from "react-router-dom"
import { getTags, deleteTag } from "../../managers/tags.js"
import "./Tag.css"
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export const Tag = ({ tag, setterFunction }) => {
    const navigate = useNavigate()

    const deleteButton = (id) => {
        return <FaTrashAlt onClick={() => {
            deleteTag(id)
            .then(() => {
                getTags().then((data) => setterFunction(data))}) 
        }} className="deleteButton"/>
    }

    return(
        <article className="tags__individual">
            <div>
                <h3>{tag.label}</h3>
            </div>
            <div className="grey-buttons">
                <FaEdit className="editButton"
                    onClick={() => {
                        navigate({ pathname: `edit/${tag.id}` })
                        }}/>
                {deleteButton(tag.id)}
            </div>
        </article>
    )
}