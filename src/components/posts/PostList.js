import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Post, Posts, TableRow } from "./Posts"
import { getPosts, getSearchedPosts } from "../../managers/Posts"
import "./Posts.css"

export const PostList = ({ token, authorChoice, selectedCategory }) => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [searchTerms, setSearchTerms] = useState("Search Posts By Title")

  const navigate = useNavigate()

  useEffect(() => {
    getPosts().then((postData) => setPosts(postData))
    setFilteredPosts(posts)
  }, [])

  useEffect(() => {
    if (selectedCategory === 0 && authorChoice === 0) {
      setFilteredPosts(posts)
    } else if (selectedCategory !== 0 && authorChoice === 0) {
      const filteredCopy = posts.filter(
        (post) => post.category.id === parseInt(selectedCategory)
      )
      setFilteredPosts(filteredCopy)
    } else if (selectedCategory === 0 && authorChoice !== 0) {
      const filteredPostList = posts.filter(
        (post) => post.author.id === parseInt(authorChoice)
      )
      setFilteredPosts(filteredPostList)
    } else if (selectedCategory !== 0 && authorChoice !== 0) {
      const filteredPostList = posts.filter(
        (post) =>
          post.author.id === parseInt(authorChoice) &&
          post.category.id === parseInt(selectedCategory)
      )
      setFilteredPosts(filteredPostList)
    }
  }, [posts, selectedCategory, authorChoice])
  
  const handleKeypress = e => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
        handleSubmit();
    }
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      getSearchedPosts(`${searchTerms}`).then((data) => setFilteredPosts(data))
      setSearchTerms("Search Posts By Title")
      document.getElementById("search").value = "" 
  };

  return (
    <><><section className="posts__buttons">
    <section className="posts__filters">
    <form><input type="textfield" placeholder={searchTerms}  id="search"
        onChange={(e) =>
            setSearchTerms(e.target.value)}
        onKeyUp={handleKeypress}></input>
        <button type="submit"
            onClick={handleSubmit}
            >Go</button>
        <button
          onClick={() =>
            setFilteredPosts(posts)}>View All</button>
        </form>
    </section>
    </section>
    </>
      <div className="post-table">
        <table className="table is-fullwidth">
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
              <Posts key={post.id} posts={post} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
