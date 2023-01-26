import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/categories"
import "./Categories.css"

export const Categories = () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getCategories().then((categoryData) => {
                setCategories(categoryData)
            })
        }, [])

    const sortCategoryList = [ ... categories].sort((a, b) => a.label > b.label ? 1 : -1)

    return (
        <div className="categoryList">
            <h1 className="categoryHeader">Categories</h1>
            <article className="categories">
                {
                    sortCategoryList.map(category => {
                        return <div key={`category--${category.id}`} className="list">
                                {category.label}
                                <div className="buttonContainer">
                                <button className="editButton">Edit</button>
                                <button className="deleteButton">Delete</button>
                                </div>
                                </div>
                    })
                }
            </article>
        </div>
    )
}