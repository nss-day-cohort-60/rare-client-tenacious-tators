import { useEffect, useState } from "react";
import { getUsers } from "../../managers/users"
import "./Posts.css"

export const PostByAuthor = ({ setPostByAuthor }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then((userData) => setUsers(userData))
    }, [])

    return (
        <>
            <label htmlFor="users">Search By Author</label><br></br>
            <select onChange={(event) => {setPostByAuthor(parseInt(event.target.value))}}>
                <option value="0" name="user_id" className="form-control">View All</option>
                {users.map(user => (
                    <option key={`user--${user.id}`} value={user.id}>
                        {user.first_name} {user.last_name}
                    </option>
                ))}
            </select>
            <br></br>
        </>
    )
}

