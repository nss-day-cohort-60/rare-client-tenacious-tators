import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { PostByAuthor } from "./PostByAuthor";
import { PostByCategory } from "./PostByCategory";
import { PostList } from "./PostList"


export const PostContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [authorChoice, setPostByAuthor] = useState(0);
    const navigate = useNavigate()

    return <><article className="posts__container">
        <section className="posts__buttons">
            <section className="posts__filters">
            <PostByAuthor setPostByAuthor={setPostByAuthor} />
            <PostByCategory setSelectedCategory={setSelectedCategory} />
            </section>
            <div className="addPostButton">Add Post <button onClick={() => navigate("newpost")}>+</button>
        </div>
        </section>
            <PostList authorChoice={authorChoice} selectedCategory={selectedCategory}/>
        </article></>
}