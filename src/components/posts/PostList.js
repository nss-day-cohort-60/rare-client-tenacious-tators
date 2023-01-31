import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post, Posts, TableRow } from "./Posts";
import { getPosts } from "../../managers/Posts";
import "./Posts.css";

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData));
  }, []);

  return (
    <>
      <div className="addPostButton">Add Post <button onClick={() => navigate("newpost")}>+</button></div>
      <div className="post-table">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Date</th>
              <th>Category</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <Posts key={post.id} post={post} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
