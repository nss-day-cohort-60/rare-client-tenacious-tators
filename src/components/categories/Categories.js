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
    <div className="category__page">
      <div class="title is-3">Categories</div>
      <section className="categoryList">
        {categories.map((category) => (
          <Category category={category} key={category.id} setterFunction={setCategories} />
        ))}
      </section>
      <div className="category__create">
        <div class="title is-5">Create a New Category</div>
        <button class="button is-small" onClick={() => navigate("create")}>
          +Add Category
        </button>
      </div>
    </div>
  )
}
