import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { getCategories } from "../../managers/categories"
import { addNewPost } from "../../managers/Posts"
import { addNewTag, getPostTags } from "../../managers/posttags"
import { getTags } from "../../managers/tags"

export const NewPost = ({ token }) => {

    const [post, setNewPost] = useState({})
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [tagsToAPI, setTagsToAPI] = useState([])

    const tagPromise = (body) => { 
        return fetch(`http://localhost:8000/posttags`, {
            method: "POST",
            headers: { "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
    }

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
        const date = new Date()

        if (categoryId === 0) {
            window.alert("Please select a category.")
        } else {
            addNewPost({
                category: categoryId,
                title: post.title,
                image_url: post.imageUrl,
                content: post.content,
                user_id: parseInt(token),
                tags: tagsToAPI,
                approved: 1
            })
                .then((res) => res.json())
                .then((res) => { 
                    let APITags = tagsToAPI.map(tag => { 
                        return {
                            tag_id: tag, 
                            post_id: res.id
                        }
                    })
                    Promise.all(APITags.map(tag => { 
                        tagPromise(tag)
                    }))
                })
                .then(() => navigate("/posts"))
        }
    }

    return (
        <form className="addNewPostForm">
            <h2 class="title is-3" className="newPostHeader">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        required autoFocus
                        className="title-form-control"
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
                        className="image-form-control"
                        placeholder="ImageURL"
                        onChange={handleNewPostInfo} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <textarea type="textbox" rows="10" cols="75" name="content" required autoFocus className="form-control" placeholder="Article Content" onChange={handleNewPostInfo} />
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
                                name="tagId"
                                type="checkbox"
                                required autoFocus
                                className="form-control"
                                placeholder="tag"
                                value={tag.id}
                                onChange={(event) => {
                                    if(event.target.checked) { 
                                        let copy = [...tagsToAPI]
                                        copy.push(parseInt(event.target.value))
                                        setTagsToAPI(copy)
                                    } else { 
                                        let copy = [...tagsToAPI] 
                                        let index = copy.indexOf(parseInt(event.target.value))
                                        copy.splice(index)
                                        setTagsToAPI(copy)
                                    }
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
            <button type="publish" className="publishFormButton"
                onClick={evt => {
                    evt.preventDefault()
                    publishNewArticle()
                }}
                >
                Publish
            </button>
        </form >
    )
}