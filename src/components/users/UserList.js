import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { getUsers, getUsersBySearchTerm } from "../../managers/users"
import { User } from "./User"
import "./Users.css"
// import { UserSearch } from "./UserSearch"

export const UserList = () => {

  const [users, setUsers] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getUsers().then(usersData => setUsers(usersData))
  }, [])
//   useEffect(() => {
//     if (searchTerm.length > 1) {
//       getUsersBySearchTerm(searchTerm).then((usersData) => setUsers(usersData))
//     } else {
//       getUsers().then((usersData) => setUsers(usersData))
//     }
//   }, [searchTerm])

//   const onSearchTermChange = (value) => {
//     setSearchTerm(value)
//   }

  return (
    <>
      {/* <UserSearch onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} /> */}
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