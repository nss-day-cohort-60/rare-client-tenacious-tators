import { useEffect, useState } from "react";
import { getPosts, getPostsByAuthor } from "../../managers/Posts";
import { getUsers } from "../../managers/users"
import "./Posts.css"

export const SearchByAuthor = ({ posts }) => {

    const [users, setUsers] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [postByAuthor, setPostByAuthor] = useState(false)

    useEffect(() => {
        getUsers().then((userData) => setUsers(userData));
    }, [])

    useEffect(() => {
        if (postByAuthor) {
            const postsByAuthor = posts.filter(post => post.userId === users.id)
            setFilteredPosts(postsByAuthor)
        } else { 
            setFilteredPosts(posts)
        }
    }
        , [postByAuthor]);

    return (
        <div className="dropdownMenu">
            <select id="users"
                onClick={() => { 
                    setPostByAuthor(true)
                }}>
                <option value="0">Search By Author</option>
                {
                    users.map(
                        (user) => {
                            return <option
                                key={`user--${user.id}`}
                                value={user.id}
                            >{user.first_name}{user.last_name}</option>
                        }
                    )
                }
            </select>
        </div>
    )
}

