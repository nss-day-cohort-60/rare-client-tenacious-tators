import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById } from "../../managers/users"
import { SubscriptionForm } from "./subscribe"

import "./Users.css"

export const UserDetails = ({token}) => {
  const [user, setUser] = useState({
    profile_image_url: "",
    full_name: "",
    bio: "",
    user: {
      date_joined: "",
      email: "",
      username: ""
    }
  })
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
      <h3 className="user__name">Name: {user.full_name}</h3>
      <div className="user__username">Username: {user.user.username}</div>
      <div className="user__created">Account Created: {user.user.date_joined}</div>
      <div className="user__bio">Bio: {user.bio}</div>
      {/* <SubscriptionForm authorId = {userId} /> */}
      </article>
    </section>
  )
}
