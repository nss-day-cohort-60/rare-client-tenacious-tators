import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { getCategories } from "../../managers/categories"
import { getTags } from "../../managers/tags"
import { getUsers } from "../../managers/users"
import { addNewPost } from "../../managers/Posts"
import { Navigate } from "react-router-dom"


export const NewPost = () => {
    const user = useRef(null)

    const [post, setNewPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    const handleNewPostInfo = (event) => {
        const newPost = Object.assign({}, post)
        newPost[event.target.name] = event.target.value
        setNewPost(newPost)
    }

    useEffect(
        () => {
            getCategories().then((categoryData) => setCategories(categoryData))
            getTags().then((tagArray) => setTags(tagArray))
            getUsers().then((userData) => setUsers(userData))
        }, [])

    const publishNewArticle = () => {
        const category_id = parseInt(post.category_id)
        const tag_id = parseInt(post.tag_id)

        if (category_id === 0) {
            window.alert("Please select a category.")
        } else {
            addNewPost({
                id: post.id,
                category_id: category_id,
                title: post.title,
                image_url: post.image_url,
                content: post.content,
                tag_id: tag_id, 
                user_id: post.user_id
            })
                .then(() => Navigate("/myposts"))
        }
    }

    return (
        <form className="addNewPostForm">
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="title" required autoFocus className="form-control" placeholder="Title" defaultValue={post.title} onChange={handleNewPostInfo}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="imageUrl" required autoFocus className="form-control" placeholder="ImageURL" defaultValue={post.image_url}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="textbox" rows="5" cols="30" id="content" defaultValue={post.content} required autoFocus className="form-control" placeholder="Article Content" onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="category" id="categorySelect" className="form-control" onChange={handleNewPostInfo} value={post.category_id}>
                        <option value="0">Category Select</option>
                        {categories.map(category => (
                            <option key={`category--${category.id}`} value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group categoryGroup">

                    {tags.map(tag => (
                        <div className="categoryList">
                            <input type="checkbox" id="tag" required autoFocus className="form-control" placeholder="tag" onChange={handleNewPostInfo} value={post.tag_id}/>
                            <label>
                                <option key={`tag--${tag.id}`} value={tag.id}>
                                    {tag.label}
                                </option>
                            </label>
                        </div>
                    ))}

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