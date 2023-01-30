import { useState, useEffect, useRef } from "react"
import { getCategories } from "../../managers/categories"
import { getTags } from "../../managers/tags"


export const NewPost = () => {
    const title = useRef(null)
    const imageUrl = useRef(null)
    const articleContent = useRef(null)
    const category = useRef(null)
    const tag = useRef(null)

    const [newPost, setNewPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    useEffect(
        () => {
            getCategories().then((categoryData) => setCategories(categoryData))
        }, [])

    useEffect(
        () => {
            getTags()
                .then((tagArray) => setTags(tagArray))
        },
        []
    )

    const publishNewArticle = () => {

    }

    return (
        <form className="addNewPostForm">
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="title" ref={title} required autoFocus className="form-control" placeholder="Title" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="imageUrl" ref={imageUrl} required autoFocus className="form-control" placeholder="ImageURL" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="textbox" rows="5" cols="30" id="articleContent" ref={articleContent} required autoFocus className="form-control" placeholder="Article Content" />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="category" ref={category} id="categorySelect" className="form-control" >
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
                            <input type="checkbox" id="tag" ref={tag} required autoFocus className="form-control" placeholder="tag" />
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