import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { getTags } from "../../managers/tags"
import { getPostTags } from "../../managers/posttags";
import { editPost, getSinglePost } from "../../managers/Posts";

export const EditPost = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([])
  const [postTags, setPostTags] = useState(new Set())
  const { postId } = useParams();
  const navigate = useNavigate();
  const [updatePost, postToUpdate] = useState({
    title: "",
    image_url: "",
    content: "",
    user: 0,
    category_id: {},
    category: 0,
    tag_id: 0
  });

  useEffect(() => {
    getSinglePost(postId).then((data) => {
      data.categoryId = data.category.id
      postToUpdate(data)
    })

  }, [postId]);

  useEffect(() => {
    getTags().then(tagArray => setTags(tagArray))
    getCategories().then((categoryData) => setCategories(categoryData));
    getPostTags().then((postTagData) => setPostTags(postTagData))
  }, [])

  const handleNewPostInfo = (event) => {
    const copy = { ...updatePost }
    copy[event.target.name] = event.target.value
    postToUpdate(copy)
  };

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
            defaultValue={updatePost.title}
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
            value={updatePost.image_url}
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
            defaultValue={updatePost.content}
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
            value={updatePost.category.id}
            onChange={(event) => {
              const copy = { ...updatePost };
              copy.category.id = parseInt(event.target.value);
              postToUpdate(copy);
            }}
          >
            {/* <option defaultValue={updatePost.category_id}>
              {updatePost?.category?.label}
            </option> */}
            {categories.map((category) => (
              <option key={`category--${category.id}`} value={category.id}>
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
                required
                className="form-control"
                checked={updatePost.tags}
                value={tag.id}
                onChange={(event) => {
                  if (event.target.checked) {
                    let copy = [...postTags]
                    copy.push(parseInt(event.target.name))
                    setPostTags(copy)
                  } else {
                    let copy = [...postTags]
                    let index = copy.indexOf(parseInt(event.target.name))
                    copy.splice(index)
                    setPostTags(copy)
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
      <button
        type="publish"
        onClick={(evt) => {
          evt.preventDefault();

          const postToUpdate = {
            category_id: updatePost.categoryId,
            title: updatePost.title,
            image_url: updatePost.image_url,
            content: updatePost.content,
            tag_id: updatePost.tags
          }
          editPost(postToUpdate, postId).then(() => navigate("/posts"));
        }}
        className="publishButton"
      >
        Publish
      </button>
    </form>
  );
};
