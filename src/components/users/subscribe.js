import { useState, useEffect } from "react"
import { addSubscription } from "../../managers/subscriptions"
import { getUserById } from "../../managers/users"
import { useNavigate, useParams } from 'react-router-dom'

export const SubscriptionForm = ({ token, authorObject}) => {
  const [follower, setFollower] = useState({});
  const tokenInt = parseInt(token);
  const navigate = useNavigate()
  const [newSubscription, updateNewSubscription] = useState({
    followerId: 0,
    authorId: 0,
    date: ""
})

  useEffect(() => {
    getUserById(tokenInt)
    .then(setFollower)
}, [token])

  const createNewSubscription = () => {
    const authorId = parseInt(authorObject.id)
    const followerId = follower.id

        // POST
        addSubscription({
          followerId: newSubscription.followerId,
          authorId: newSubscription.authorId,
          createdOn: Date.now()
        })
          .then(() => navigate("/users"))
    }
    return <button type="submit"
    onClick={evt => {
        evt.preventDefault()
        createNewSubscription()
    }}
    className="btn btn-primary">Subscribe</button>
}