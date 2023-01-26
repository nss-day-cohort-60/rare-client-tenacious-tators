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
            getCategories().then((categoryData) => {
                setCategories(categoryData)
            })
        }, [])

    const sortCategoryList = [...categories].sort((a, b) => a.label > b.label ? 1 : -1)

    return (
        <div className="categoryList">
            <h1 className="categoryHeader">Categories</h1>
            <article className="categories">
                {
                    sortCategoryList.map(category => {
                        return <><Category category={category} key={`category--${category.id}`} />
                        </>
                    })
                }
            </article >
        </div >
    )
}