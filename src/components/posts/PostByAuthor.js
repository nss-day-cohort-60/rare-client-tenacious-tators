import { useEffect, useState } from "react";
import { getUsers } from "../../managers/users"
import "./Posts.css"

export const PostByAuthor = ({ posts }) => {

    const [users, setUsers] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([])
    const [authorChoice, setPostByAuthor] = useState(0)

    useEffect(() => {
        getUsers().then((userData) => setUsers(userData))
    }, [])

    useEffect(() => {
        if (authorChoice === 0) {
            setFilteredPosts(posts)
        } else {
            const filteredPostList = posts.filter(post => post.user_id === parseInt(authorChoice))
            setFilteredPosts(filteredPostList)
        }
    }
        , [posts, authorChoice])

    return (
        <>
            <label htmlFor="users">Search By Author</label>
            <select onChange={(event) => { setPostByAuthor(parseInt(event.target.value)) }}>
                <option value="0" name="user_id" className="form-control">All Posts</option>
                {users.map(user => (
                    <option key={`user--${user.id}`} value={user.id}>
                        {user.first_name} {user.last_name}
                    </option>
                ))}
            </select>
        </>
    )
}

