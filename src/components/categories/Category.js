import { Link } from "react-router-dom"
import "./Categories.css"

export const Category = ({ category }) => (
    <section className="category">
        <div>
            <Link to={`/categories/${category.id}`}>
                <h3>{category.label}</h3>
            </Link>
            <div className="buttonContainer">
                <button className="editButton">Edit</button>
                <button className="deleteButton">Delete</button>
            </div>
        </div>
    </section>)


