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

    return (<section className="category">
                <section className="categoryList">
                    <h1 className="categoryHeader">Categories</h1>
                        {
                            categories.map(category => <Category category={category} key={category.id} />)
                        }
                </section >
                <section className="category__create">
                    <h1 className="">Create a New Category</h1>
                        <button className="category__button" onClick={() => navigate("create")}>+Add Category</button>
                </section>
        </section>
    )
}