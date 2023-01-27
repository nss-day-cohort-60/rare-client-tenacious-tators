import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/categories"
import { Category } from "./Category"
import "./Categories.css"

export const Categories = () => {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getCategories().then((categoryData) => setCategories(categoryData))
        }, [])

    return (
        <div className="categoryList">
            <h1 className="categoryHeader">Categories</h1>
            <article className="categories">
                {
                    categories.map(category => <Category category={category} key={category.id} />
                    )
                }
            </article >
        </div >
    )
}