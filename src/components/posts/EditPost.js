import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../managers/categories";
import { editPost, getSinglePost } from "../../managers/Posts";

export const EditPost = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [updatePost, postToUpdate] = useState({
    title: "", 
    image_url: "", 
    content: "", 
    user: 0, 
    category_id: 0
  });

  useEffect(() => {
    getSinglePost(postId).then((Data) => postToUpdate(Data));
  }, [postId]);

  const handleNewPostInfo = (event) => {
    const copy = { ...updatePost }
    copy[event.target.name] = event.target.value
    postToUpdate(copy)
  };

  useEffect(() => {
    getCategories().then((categoryData) => setCategories(categoryData));
  }, []);

  const publishNewArticle = () => {
    const categoryId = parseInt(updatePost.categoryId)
    // const date = new Date()


    editPost({
      category_id: categoryId,
      title: updatePost.title,
      image_url: updatePost.imageUrl,
      content: updatePost.content,
      user_id: parseInt(token),
      publication_date: updatePost.publication_date,
      approved: 1
    })
      .then((res) => res.json())
      // .then((res) => { 
      //     let APITags = tagsToAPI.map(tag => { 
      //         return {
      //             tag_id: tag, 
      //             post_id: res.id
      //         }
      //     })
      //     Promise.all(APITags.map(tag => { 
      //         tagPromise(tag)
      //     }))
      // })
      .then(() => navigate("/posts"))
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
          defaultValue={updatePost.image_url}
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
          value={updatePost.categoryId}
          onChange={(event) => {
            const copy = { ...updatePost };
            copy.categoryId = parseInt(event.target.value);
            postToUpdate(copy);
          }}
        >
          <option defaultValue={updatePost.category_id}>
            {updatePost?.category?.label}
          </option>
          {categories.map((category) => (
            <option key={`category--${category.id}`} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
    {/* <fieldset>
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
                                        let copy = [...newTags]
                                        copy.push(parseInt(event.target.value))
                                        setNewTags(copy)
                                    } else { 
                                        let copy = [...newTags] 
                                        let index = copy.indexOf(parseInt(event.target.value))
                                        copy.splice(index)
                                        setNewTags(copy)
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
            </fieldset> */}
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
