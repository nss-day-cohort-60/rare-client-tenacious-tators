import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewCategory } from "../../managers/categories"

export const NewTag = () => {
    const [tag, setNewTag] = useState({})
    const navigate = useNavigate()
    
    const handleNewTagInfo = (event) => {
        const newTag = Object.assign({}, tag)
        newTag[event.target.name] = event.target.value
        setNewTag(newTag)
    }

    const createNewTag = () => {addNewCategory({label: category.label}).then(() => navigate("/tags"))}

    return (
        <form className="addNewTagForm">
            <h2>Add New Tag</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" name="label" required autoFocus className="form-control" placeholder="Tag Label" onChange={handleNewTagInfo} />
                </div>
            </fieldset>
            <button type="publish"
                onClick={evt => {
                    evt.preventDefault()
                    createNewTag()
                }}
                className="publishButton">
                Create
            </button>
        </form>
    )
}