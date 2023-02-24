import { Link, useNavigate } from "react-router-dom"
import "./Categories.css"
import { getCategories, deleteCategory } from "../../managers/categories.js"

export const Category = ({ category, setterFunction }) => {
    const navigate = useNavigate()

    const deleteButton = (id) => {
        return <button onClick={() => {
            deleteCategory(id)
                .then(() => {
                    getCategories().then((data) => setterFunction(data))
                })
        }} class="button is-small" className="deleteButton">Delete</button>
    }

    return (
        <article className="categories" >
            <div class="column is-full" className="category">
                <Link class="title is-5" to={`/categories/${category.id}`}>
                    <h3>{category.label}</h3>
                </Link>
                <div className="buttonContainer">
                    <button class="button is-small" className="editButton"
                        onClick={() => {
                            navigate({ pathname: `edit/${category.id}` })
                        }}>Edit</button>

                    {deleteButton(category.id)}
                </div>
            </div>
        </article>
    )
}


