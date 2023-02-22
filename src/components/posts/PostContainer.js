import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getSearchedPosts } from "../../managers/Posts";
import { PostByAuthor } from "./PostByAuthor";
import { PostByCategory } from "./PostByCategory";
import { PostByTitleSearch } from "./PostByTitleSearch";
import { PostList } from "./PostList"


export const PostContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [searchTerms, setSearchTerms] = useState("Search Posts By Title")
    const [authorChoice, setPostByAuthor] = useState(0);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchedPosts(`${searchTerms}`).then((data) => setFiltered(data))
        setSearchTerms("Search Tickets")
        document.getElementById("search").value = "" 
    };
    
    
    return <><article className="posts__container">
        <section className="posts__buttons">
            <section className="posts__filters">
            <PostByAuthor setPostByAuthor={setPostByAuthor} />
            <PostByCategory setSelectedCategory={setSelectedCategory} />
            <PostByTitleSearch setSearchTerms={setSearchTerms} handleSubmit={handleSubmit}/>
            </section>
            <div className="addPostButton">Add Post <button onClick={() => navigate("newpost")}>+</button>
        </div>
        </section>
            <PostList authorChoice={authorChoice} selectedCategory={selectedCategory} searchTerms={searchTerms} setSearchTerms={setSearchTerms} />
        </article></>
}