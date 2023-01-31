import { addSubscription } from "../../managers/subscriptions"
import { useNavigate } from 'react-router-dom'

export const SubscriptionForm = ({ token, authorObject}) => {

  const tokenInt = parseInt(token)
  const navigate = useNavigate()
  const subscription = {
    follower_id: tokenInt,
    author_id: authorObject.id
  }

  const createNewSubscription = () => {
        const copy = {...subscription}
        copy.created_on = Date.now()

          addSubscription(copy)
          .then(() => navigate(`/`))
    }
    return <button type="submit"
    onClick={evt => {
        evt.preventDefault()
        createNewSubscription()
    }}
    className="subscribeBtn">Subscribe</button>
}