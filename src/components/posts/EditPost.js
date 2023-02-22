import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { getTags } from "../../managers/tags"
import { editPost, getSinglePost } from "../../managers/Posts";

export const EditPost = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [postTags, setPostTags] = useState([])
  const { postId } = useParams();
  const navigate = useNavigate();
  const [updatePost, postToUpdate] = useState({
    title: "",
    image_url: "",
    content: "",
    user: 0,
    categoryId: 0, 
    tag_id: 0, 
    tags: {}
  });

  useEffect(() => {
    getSinglePost(postId).then((data) => {
      postToUpdate(data)
    })

  }, [postId]);

  useEffect(() => { 
    getTags().then(tagArray => setPostTags(tagArray))
    getCategories().then((categoryData) => setCategories(categoryData));
  }, [])

  const handleNewPostInfo = (event) => {
    const copy = { ...updatePost }
    copy[event.target.name] = event.target.value
    postToUpdate(copy)
  };

  // const publishNewArticle = () => {
  //   editPost(updatePost, postId).then(() => navigate("/posts"));
  // };


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
            placeholder="Title"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Image URL: </label>
          <input
            type="text"
            name="imageUrl"
            required
            defaulValue={updatePost.image_url}
            autoFocus
            className="form-control"
            placeholder="ImageURL"
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
            placeholder="Article Content"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Category: </label>
          <select
            name="categoryId"
            className="form-control"
            defaultValue={updatePost.category_id}
            onChange={(event) => {
              const copy = { ...updatePost };
              copy.category_id = parseInt(event.target.value);
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
          {postTags.map(tag => (
            <div className="tags">
              <input
                name="tagId"
                type="checkbox"
                required autoFocus
                className="form-control"
                defaultValue={updatePost.tag_id}
                onChange={(event) => {
                  if (event.target.checked) {
                    let copy = [...updatePost]
                    copy.push(parseInt(event.target.value))
                    postToUpdate(copy)
                  } else {
                    let copy = [...updatePost]
                    let index = copy.indexOf(parseInt(event.target.value))
                    copy.splice(index)
                    postToUpdate(copy)
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
            title: updatePost.title, 
            author: updatePost.user_id, 
            content: updatePost.content, 
            publication_date: updatePost.publication_date,
            image_url: updatePost.image_url,
            tag_id: updatePost.tags, 
            category_id: updatePost.category, 
            approved: 1
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
