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
      <div className="category__create addPostButton">
        <button onClick={() => navigate("create")}>
          +
        </button> Add Category 
      </div>
      <div class="title is-3">Categories</div>
      <section className="categoryList">
        {categories.map((category) => (
          <Category category={category} key={category.id} setterFunction={setCategories} />
        ))}
      </section>
    </div>
  )
}
