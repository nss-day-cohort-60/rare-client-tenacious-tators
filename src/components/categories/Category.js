import { Link, useNavigate } from "react-router-dom"
import "./Categories.css"
import { getCategories, updateCategory } from "../../managers/categories.js"
import { deleteCategory } from "../../managers/categories"
import { useEffect, useState } from "react"

export const Category = ({ category, setterFunction }) => {
    // const [ categories, setCategories ] = useState([
    //     {id: 0,
    //     label: ""
    //     }
    // ])
    const navigate = useNavigate()
    
    // useEffect(() => {
    //     getCategories().then(data => setterFunction(data))
    // }, [])

    // const getAllCats

    const deleteButton = (id) => {
        return <button onClick={() => {
            deleteCategory(id)
            .then(() => {
                getCategories().then((data) => setterFunction(data))}) 
        }} className="deleteButton">Delete</button>
    }

    return(
        <article className="categories">
            <div>
                <Link to={`/categories/${category.id}`}>
                    <h3>{category.label}</h3>
                </Link>
                <button className="editButton"
                    onClick={() => {
                        navigate({ pathname: `edit/${category.id}` })
                        }}>Edit</button>
                {deleteButton(category.id)}
            </div>
        </article>
    )
}


