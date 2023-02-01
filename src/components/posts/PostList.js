import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post, Posts, TableRow } from "./Posts";
import { getPosts } from "../../managers/Posts";
import {PostByAuthor} from "./PostByAuthor"
import "./Posts.css";
import { getCategories } from "../../managers/categories";

export const PostList = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(0)
  const navigate = useNavigate();

  useEffect(
    () => {
      getCategories().then((categoryData) => setCategories(categoryData))
    }, [])

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, []);

  useEffect(
    () => {
      if (selectedCategory === 0) { setFilteredPosts(posts) }
      else {
        const filteredCopy = posts.filter(post => post.category_id === parseInt(selectedCategory))
        setFilteredPosts(filteredCopy)
      }
    },
    [posts, selectedCategory]
  )
  return (
    <>
      <PostByAuthor posts={posts} /><br></br>
      <label htmlFor="categories">Search By Category</label><br></br>
        <select onChange={(event) => { setSelectedCategory(parseInt(event.target.value)) }}>
          <option value="0" name="category_id" className="form-control" >View All</option>
          {categories.map(category => (
            <option key={`category--${category.id}`} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
        <div className="addPostButton">
          Add Post <button onClick={() => navigate("newpost")}>+</button>
        </div>
        <div className="post-table">
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th></th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Category</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <Posts key={post.id} post={post} token={token} />
              ))}
            </tbody>
          </table>
        </div>
      </>
      );
};
