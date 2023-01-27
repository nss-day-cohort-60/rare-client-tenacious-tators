import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById } from "../../managers/users"

import "./Users.css"

export const UserDetails = () => {
  const [user, setUser] = useState({})
  const { userId } = useParams()
//   const navigate = useNavigate()

  useEffect(() => {
    getUserById(userId)
      .then(setUser)
  }, [userId])

  return (
    <section className="user">
      <h3 className="user__name">Name: {user.first_name} {user.last_name}</h3>
      <div className="user__breed">Username: {user.username}</div>
      <div className="user__location">Account Created: {user.created_on}</div>
      <div className="user__owner">Bio: {user.bio}</div>
    </section>
  )
}
