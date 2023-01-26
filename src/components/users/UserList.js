import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getUsers, getUsersBySearchTerm } from "../../managers/users"
import { User } from "./User"
import "./Users.css"

export const UserList = () => {

  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then(usersData => setUsers(usersData))
  }, [])


  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <div className="users">
          {
            users
                .sort((a, b) => a.username > b.username ? 1 : -1)
                .map(user => <User key={user.id} user={user} />)
          }
        </div>
      </div>
    </>
  )
}