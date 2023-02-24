import { Link, useNavigate } from "react-router-dom"
import "./Categories.css"
import { getCategories, deleteCategory } from "../../managers/categories.js"
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export const Category = ({ category, setterFunction }) => {
    const navigate = useNavigate()

    const deleteButton = (id) => {
        return <FaTrashAlt onClick={() => {
            deleteCategory(id)
            .then(() => {
                getCategories().then((data) => setterFunction(data))}) 
        }} />}    

    return(
        <article className="categories">
            <div>
                <Link to={`/categories/${category.id}`}>
                    <h3>{category.label}</h3>
                </Link>
                <FaEdit
                    onClick={() => {
                        navigate({ pathname: `edit/${category.id}` })
                        }}/>
                {deleteButton(category.id)}
            </div>
        </article>
    )
}