import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getUserById } from "../../managers/users"
import { SubscriptionForm } from "./subscribe"

import "./Users.css"

export const UserDetails = () => {
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

  useEffect(() => {
    getUserById(userId)
      .then(setUser)
  }, [userId])
  
  const date = user.user.date_joined
  const formatted_date = new Date(date).toLocaleDateString("en-US")

  return (
    <section className="users__container">
      <section className="userdetail__image">
        <img className="userdetail__image" src={user.profile_image_url}/>
      </section>
      <article className="user__info">
        <h3 className="user__name">Name: {user.full_name}</h3>
        <div className="user__username">Username: {user.user.username}</div>
        <div className="user__created">User Since: {formatted_date}</div>
        <div className="user__bio">Bio: {user.bio}</div>
        <SubscriptionForm user={user} setUser={setUser}/>
      </article>
    </section>
  )
}
