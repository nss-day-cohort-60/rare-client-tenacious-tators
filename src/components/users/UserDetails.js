import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById } from "../../managers/users"
import { SubscriptionForm } from "./subscribe"

import "./Users.css"

export const UserDetails = ({token}) => {
  const [user, setUser] = useState({})
  const { userId } = useParams()
//   const navigate = useNavigate()

  useEffect(() => {
    getUserById(userId)
      .then(setUser)
  }, [userId])

  return (
    <section className="user">
        <img className="user__image" src={user.profile_image_url}/>
            <article className="user__info">
      <h3 className="user__name">Name: {user.first_name} {user.last_name}</h3>
      <div className="user__username">Username: {user.username}</div>
      <div className="user__created">Account Created: {user.created_on}</div>
      <div className="user__bio">Bio: {user.bio}</div>
      <SubscriptionForm authorId = {userId} token={token}/>
      </article>
    </section>
  )
}
