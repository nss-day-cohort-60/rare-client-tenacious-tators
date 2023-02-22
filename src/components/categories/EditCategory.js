import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, updateCategory } from '../../managers/categories.js'

export const EditCategory = () => {
    const navigate = useNavigate()
    // const [category, setCategory] = useState([])
    const { categoryId } = useParams()

    const [currentCategory, setCurrentCategory] = useState({
        label: ""
    })

    useEffect(() => {
        getCategoryById(categoryId).then((data) => {
            data.categoryId = data.id
            setCurrentCategory(data)
        })
    }, [categoryId])

    const changeCategoryState = (domEvent) => {
        // TODO: Complete the onChange function
        const copy = { ...currentCategory }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentCategory(copy)
    }

    return (
        <form className="categoryForm">
            <h2 className="categoryForm__title">Update Category</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="label">Label: </label>
                    <input type="text" name="label" required autoFocus className="form-control"
                        value={currentCategory.label}
                        onChange={changeCategoryState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const category = {
                        label: currentCategory.label
                    }

                    // Send POST request to your API
                    updateCategory(category, categoryId)
                        .then(() => navigate("/categories"))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}