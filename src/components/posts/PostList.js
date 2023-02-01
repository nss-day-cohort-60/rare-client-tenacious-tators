import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post, Posts, TableRow } from "./Posts";
import { getPosts } from "../../managers/Posts";
import {PostByAuthor} from "./PostByAuthor"
import "./Posts.css";
import { getCategories } from "../../managers/categories";

export const PostList = ({ token, authorChoice , selectedCategory }) => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(
    () => {
      getPosts().then((postData) => setPosts(postData))
      setFilteredPosts(posts)
    }, [])

  useEffect(
      () => {
        if (selectedCategory === 0 && authorChoice === 0) { setFilteredPosts(posts) }
        else if (selectedCategory !== 0 && authorChoice === 0) {
          const filteredCopy = posts.filter(post => post.category_id === parseInt(selectedCategory))
          setFilteredPosts(filteredCopy)
        }
        else if (selectedCategory === 0 && authorChoice !== 0) {
          const filteredPostList = posts.filter(post => post.user_id === parseInt(authorChoice))
          setFilteredPosts(filteredPostList)
        }
        else if (selectedCategory !== 0 && authorChoice !== 0) {
          const filteredPostList = posts.filter(post => post.user_id === parseInt(authorChoice) && post.category_id === parseInt(selectedCategory))
          setFilteredPosts(filteredPostList)
        }
      },
      [posts, selectedCategory, authorChoice]
    )

//   useEffect(
//     () => {
//       if (selectedCategory === 0) { setFilteredPosts(posts) }
//       else {
//         const filteredCopy = posts.filter(post => post.category_id === parseInt(selectedCategory))
//         setFilteredPosts(filteredCopy)
//       }
//     },
//     [posts, selectedCategory]
//   )

//   useEffect(() => {
//     if (authorChoice === 0) {
//         setFilteredPosts(posts)
//     } else {
//         const filteredPostList = posts.filter(post => post.user_id === parseInt(authorChoice))
//         setFilteredPosts(filteredPostList)
//     }
// }
//     , [posts, authorChoice])
    
  return (
    <>
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
