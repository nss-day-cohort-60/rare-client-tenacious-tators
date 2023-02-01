import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { getCategories } from "../../managers/categories"
import { addNewPost } from "../../managers/Posts"
import { getTags } from "../../managers/tags"

export const NewPost = ({ token }) => {
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
            getTags().then((tagData) => setTags(tagData))
        }, [])

    const publishNewArticle = () => {
        const categoryId = parseInt(post.categoryId)
        const tagId = parseInt(post.tagId)
        const date = new Date()

        if (categoryId === 0) {
            window.alert("Please select a category.")
        } else {
            addNewPost({
                category_id: categoryId,
                title: post.title,
                image_url: post.imageUrl,
                content: post.content,
                tag_id: tagId,
                user_id: parseInt(token),
                publication_date: `${date}`,
                approved: 1
            })
                .then(() => navigate("/posts"))
        }
    }

    return (
        <form className="addNewPostForm">
            <h2>New Post</h2>
            <fieldset>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        required autoFocus
                        className="form-control"
                        placeholder="Title"
                        onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <input
                        type="text"
                        name="imageUrl"
                        required autoFocus
                        className="form-control"
                        placeholder="ImageURL"
                        onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="textbox" rows="5" cols="30" name="content" required autoFocus className="form-control" placeholder="Article Content" onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <select
                        name="categoryId"
                        className="form-control"
                        value={post.categoryId}
                        onChange={(event) => {
                            const copy = { ...post }
                            copy.categoryId = parseInt(event.target.value)
                            setNewPost(copy)
                        }}>
                        <option value="0">Category Select</option>
                        {categories.map(category => (
                            <option
                                key={`category--${category.id}`}
                                value={category.id}>
                                {category.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group tagGroup">

                    {tags.map(tag => (
                        <div className="tags">
                            <input
                                type="checkbox"
                                required autoFocus
                                className="form-control"
                                placeholder="tag"
                                value={tag.id}
                                onChange={(event) => {
                                    const copy = { ...post }
                                    copy.tagId = parseInt(event.target.value)
                                    handleNewPostInfo(copy)
                                }}
                            />
                            <label className="tagLabel">
                                <option
                                    key={`tag--${tag.id}`}
                                    value={tag.id}
                                    >
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
        </form >
    )
}