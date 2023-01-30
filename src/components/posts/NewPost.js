import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { getCategories } from "../../managers/categories"
import { getUsers } from "../../managers/users"
import { addNewPost } from "../../managers/Posts"
import { Navigate } from "react-router-dom"

export const NewPost = ({ token }) => {
    const user = useRef(null)

    const [post, setNewPost] = useState({})
    const [categories, setCategories] = useState([])
    const [users, setUsers] = useState([])

    // const tokenInt = parseInt(token);
    const navigate = useNavigate()
    
    const handleNewPostInfo = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setNewPost(newPost)
    }

    useEffect(
        () => {
            getCategories().then((categoryData) => setCategories(categoryData))
            getUsers().then((userData) => setUsers(userData))
        }, [])

    const publishNewArticle = () => {
        const categoryId = parseInt(post.categoryId)

        if (categoryId === 0) {
            window.alert("Please select a category.")
        } else {
            addNewPost({
                categoryId: categoryId,
                title: post.title,
                imageUrl: post.imageUrl,
                content: post.content,
                userId: parseInt(token),
                publicationDate: post.date, 
                approved: 1
            })
                .then(() => Navigate("/myposts"))
        }
    }

    return (
        <form className="addNewPostForm">
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" name="title" required autoFocus className="form-control" placeholder="Title" onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" name="imageUrl" required autoFocus className="form-control" placeholder="ImageURL" onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="textbox" rows="5" cols="30" name="content" required autoFocus className="form-control" placeholder="Article Content" onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select name="categoryId" className="form-control" value={post.categoryId} onChange={(event) => {
                        const copy = { ...post }
                        copy.categoryId = parseInt(event.target.value)
                        setNewPost(copy)
                    }}>
                        <option value="0">Category Select</option>
                        {categories.map(category => (
                            <option key={`category--${category.id}`} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="publish"
                onClick={evt => {
                    evt.preventDefault()
                    publishNewArticle()
                }}
                className="publishButton">
                Publish
            </button>
        </form>
    )
}