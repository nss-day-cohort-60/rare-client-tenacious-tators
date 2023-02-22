import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { updatePost, getSinglePost } from "../../managers/Posts";

export const EditPost = ({ token }) => {
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSinglePost(postId).then((Data) => setPost(Data));
  }, [postId]);

  const handleNewPostInfo = (event) => {
    const newPost = Object.assign({}, post);
    newPost[event.target.name] = event.target.value;
    setPost(newPost);
  };

  useEffect(() => {
    getCategories().then((categoryData) => setCategories(categoryData));
  }, []);

  const publishNewArticle = () => {
    updatePost(postId, post).then(() => navigate("/posts"));
  };

  return (
    <form className="addNewPostForm">
      <h2>Edit Post</h2>
      <fieldset>
        <div className="form-group">
          <input
            type="text"
            name="title"
            required
            autoFocus
            defaultValue={post.title}
            className="form-control"
            placeholder="Title"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <input
            type="text"
            name="imageUrl"
            required
            defaultValue={post.image_url}
            autoFocus
            className="form-control"
            placeholder="ImageURL"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <textarea
            type="textbox"
            rows="5"
            cols="30"
            name="content"
            required
            defaultValue={post.content}
            autoFocus
            className="form-control"
            placeholder="Article Content"
            onChange={handleNewPostInfo}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <select
            name="categoryId"
            className="form-control"
            value={post.categoryId}
            onChange={(event) => {
              const copy = { ...post };
              copy.categoryId = parseInt(event.target.value);
              setPost(copy);
            }}
          >
            <option defaultValue={post.category_id}>
              {post?.category?.label}
            </option>
            {categories.map((category) => (
              <option key={`category--${category.id}`} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="publish"
        onClick={(evt) => {
          evt.preventDefault();
          publishNewArticle();
        }}
        className="publishButton"
      >
        Publish
      </button>
    </form>
  );
};
