import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getSearchedPosts } from "../../managers/Posts"
import { PostByAuthor } from "./PostByAuthor"
import { PostByCategory } from "./PostByCategory"
import { PostList } from "./PostList"

export const PostContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [authorChoice, setPostByAuthor] = useState(0)

  const navigate = useNavigate()

  return (
    <>
      <article className="container">
        <section className="columns">
          <div className="column">
            <PostByAuthor setPostByAuthor={setPostByAuthor} />
          </div>
          <div className="column">
            <PostByCategory setSelectedCategory={setSelectedCategory} />
          </div>
          <div className="column">
            <button className="button" onClick={() => navigate("newpost")}>
              New Post
            </button>
          </div>
        </section>
        <PostList
          authorChoice={authorChoice}
          selectedCategory={selectedCategory}
        />
      </article>
    </>
  )
}
