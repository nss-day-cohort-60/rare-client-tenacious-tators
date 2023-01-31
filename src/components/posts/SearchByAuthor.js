import { useEffect, useState } from "react";
import { getPosts, getPostsByAuthor } from "../../managers/Posts";
import "./Posts.css"

export const SearchByAuthor = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts().then((postData) => setPosts(postData));
    }, []);

    const choosePostByAuthor = (event) => { 
        
    }

    return (
        <div className="dropdownMenu">
            <select id="postByAuthor">
                <option value="0">Search By Author</option>
                {
                    posts.map(
                        (post) => {
                            return <option
                                key={`post--${post.id}`}
                                value={post.id}
                                onChange={
                                    (event) => {
                                        const copy = { ...posts }
                                        copy.post.userId = parseInt(event.target.value)
                                        getPostsByAuthor(copy)
                                    }}>{post?.user?.first_name}{post?.user?.last_name}</option>
                        }
                    )
                }
            </select>
        </div>
    )
}

