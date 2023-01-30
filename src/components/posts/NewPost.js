import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { getCategories } from "../../managers/categories"
import { getTags } from "../../managers/tags"
import { addNewPost } from "../../managers/Posts"
import { Navigate } from "react-router-dom"


export const NewPost = () => {
    const title = useRef(null)
    const imageurl = useRef(null)
    const content = useRef(null)
    const category = useRef(null)
    const tag = useRef(null)

    const [post, setNewPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
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
                publication_date: post.publication_date, 
                image_url: post.image_url,
                content: post.content,
                tag_id: tag_id, 
                approved: post.approved,
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
                    <input type="text" id="title" ref={title} required autoFocus className="form-control" placeholder="Title" onChange={handleNewPostInfo}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="imageUrl" ref={imageurl} required autoFocus className="form-control" placeholder="ImageURL" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="textbox" rows="5" cols="30" id="content" ref={content} required autoFocus className="form-control" placeholder="Article Content" onChange={handleNewPostInfo}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="category" ref={category} id="categorySelect" className="form-control" onChange={handleNewPostInfo}>
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
                            <input type="checkbox" id="tag" ref={tag} required autoFocus className="form-control" placeholder="tag" onChange={handleNewPostInfo}/>
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