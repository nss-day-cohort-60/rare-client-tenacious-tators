import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getUsers, getUsersBySearchTerm } from "../../managers/users"
import { User } from "./User"
import "./Users.css"

export const UserList = ({ token }) => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then((usersData) => setUsers(usersData))
  }, [])

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <div className="users">
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </div>
      </div>
    </>
  )
}
