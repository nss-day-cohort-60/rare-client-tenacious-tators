import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/categories"
import { Category } from "./Category"
import "./Categories.css"

export const Categories = ({ token }) => {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getCategories().then((categoryData) => setCategories(categoryData))
  }, [])

  return (
    <>
    <h1 className="categoryHeader">Categories</h1>
    <section className="category">
      <section className="categoryList">
        {categories.map((category) => (
          <Category category={category} key={category.id} setterFunction={setCategories} />
        ))}
      </section>
      <section className="category__create">
        <button className="button is-rounded" onClick={() => navigate("create")}>
          +Add Category
        </button>
      </section>
    </section>
    </>
  )
}
