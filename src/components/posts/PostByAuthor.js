import { useEffect, useState } from "react"
import { getUsers } from "../../managers/users"
import "./Posts.css"

export const PostByAuthor = ({ setPostByAuthor }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((userData) => setUsers(userData))
  }, [])

  return (
    <>
      <section className="posts__dropdown">
        <label htmlFor="users">Search By Author</label>
        <br></br>
        <select
          onChange={(event) => {
            setPostByAuthor(parseInt(event.target.value))
          }}
        >
          <option value="0" name="user_id" className="form-control">
            View All
          </option>
          {users.map((user) => (
            <option key={`user--${user.id}`} value={user.id}>
              {user.full_name}
            </option>
          ))}
        </select>
        <br></br>
      </section>
    </>
  )
}
