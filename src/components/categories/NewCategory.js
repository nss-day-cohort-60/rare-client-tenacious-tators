import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { addNewCategory } from "../../managers/categories"

export const NewCategory = () => {
    const [category, setNewCategory] = useState({})
    const navigate = useNavigate()
    
    const handleNewCategoryInfo = (event) => {
        const newCategory = Object.assign({}, category)
        newCategory[event.target.name] = event.target.value
        setNewCategory(newCategory)
    }

    const createNewCategory = () => {addNewCategory({label: category.label}).then(() => navigate("/categories"))}

    return (
        <form className="addNewCategoryForm">
            <h2>Add New Category</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" name="label" required autoFocus className="form-control" placeholder="Category Label" onChange={handleNewCategoryInfo} />
                </div>
            </fieldset>
            <button type="publish"
                onClick={evt => {
                    evt.preventDefault()
                    createNewCategory()
                }}
                className="publishButton">
                Create
            </button>
        </form>
    )
}