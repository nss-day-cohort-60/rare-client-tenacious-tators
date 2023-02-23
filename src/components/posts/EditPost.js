import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { updatePost, getSinglePost } from "../../managers/Posts"
import { getTags } from "../../managers/tags"


export const EditPost = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [postTags, setPostTags] = useState(new Set())
  const [currentPost, setCurrentPost] = useState({
    categoryId: 0,
    title: "",
    image_url: "",
    content: "",
    user_id: parseInt(token),
    tags: [],
    approved: 0
  });

  const tagArr = (tagId) => {
    let copy = new Set(postTags)
    copy.has(tagId) ? copy.delete(tagId) : copy.add(tagId)
    setPostTags(copy)
}

  useEffect(() => {
      getSinglePost(postId).then((data) => {
          setCurrentPost(data)

          const tagSet = new Set()
          for (const tag of data.tags) {
              tagSet.add(tag.id)
          }
          setPostTags(tagSet)
      })
  }, [postId])

  useEffect(() => {
    getCategories().then((data) => setCategories(data))
    getSinglePost(postId).then((data) => {
      data.categoryId = data.category.id
      setCurrentPost(data)
  })}, [postId])

  useEffect(() => {
    getTags().then(data => setTags(data))
}, [])

  const handleNewPostInfo = (event) => {
    const copy = {...currentPost}
    copy[event.target.name] = event.target.value;
    setCurrentPost(copy);
  }

  // const publishNewArticle = () => {
  //   editPost(updatePost, postId).then(() => navigate("/posts"));
  // };

  const tagArray = (postTagId) => {
    let copy = new Set(postTags)
    copy.has(postTagId) ?
    copy.delete(postTagId)
      : copy.add(postTagId)

    setNewPostTags(copy)
  }


  return (
    <form className="addNewPostForm">
      <h2>Edit Post</h2>
      <fieldset>
        <div className="form-group">
          <label>Title: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            defaultValue={currentPost.title}
            className="form-control"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Image URL: </label>
          <input
            type="text"
            name="image_url"
            required
            defaultValue={currentPost.image_url}
            autoFocus
            className="form-control"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Content: </label>
          <textarea
            type="textbox"
            rows="5"
            cols="30"
            name="content"
            required
            defaultValue={currentPost.content}
            autoFocus
            className="form-control"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Category: </label>
          <select
            name="category"
            className="form-control"
            value={currentPost.categoryId}
            onChange={(event) => {
              const copy = { ...currentPost };
              copy.categoryId = parseInt(event.target.value);
              setCurrentPost(copy);
            }}
          >
            
            {categories.map((category) => (
              <option key={`category--${category.id}`} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <fieldset>
      <div className="field">
        <label htmlFor="content" className="label">Tags: </label>
        {
          tags.map(tag => {
              const foundTag = currentPost.tags.find(postTag => tag.id === postTag.id)

              return <div key={`tag--${tag.id}`}>
                  <input type="checkbox" name={tag.label}
                      defaultChecked={foundTag}
                      onClick={() => tagArr(tag.id) } />
                  <label htmlFor={tag.label}>{tag?.label}</label><br />
              </div>
          })
        }
      </div>
    </fieldset>
      
      <button
        type="publish"
        onClick={evt => {
          evt.preventDefault()
          
          const updatedPost = {
            category: currentPost.categoryId,
            title: currentPost.title,
            image_url: currentPost.image_url,
            content: currentPost.content,
            user_id: parseInt(token),
            tags: Array.from(postTags),
            approved: 1
          }

          updatePost(postId, updatedPost)
            .then(() => navigate("/posts/myposts"))
        }}
        className="publishButton">Publish</button>
    </form>
  );
};



