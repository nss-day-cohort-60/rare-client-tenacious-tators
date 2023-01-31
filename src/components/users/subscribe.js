import { addSubscription, deleteSubscription } from "../../managers/subscriptions"
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from "react"

export const SubscriptionForm = ({ token, authorId }) => {
  const [userSubscriptions, setUserSubscriptions] = useState({})
  const tokenInt = parseInt(token)
  const navigate = useNavigate()
  const subscription = {
    follower_id: tokenInt,
    author_id: authorId
  }

  useEffect(()=>{
    fetch(`http://localhost:8088/subscriptions?follower_id=${token}`)
    .then(res=>res.json())
    .then(res=>{
      const filteredCopy = res.filter(obj=>obj.author_id === parseInt(authorId))
      console.log(filteredCopy)
      
      setUserSubscriptions(filteredCopy[0])
    })}
  , [token])

  const createNewSubscription = () => {
    const copy = {...subscription}
    copy.created_on = Date.now()
      addSubscription(copy)
      .then(() => navigate(`/`))
    }
  const unsubscribe = (id) => {
    deleteSubscription(id)
    .then(()=>{navigate(`/`)})
  }
console.log(userSubscriptions)
    return <>
      {userSubscriptions
      ?<button 
      type="submit"
      className="subscribeBtn"
      onClick={evt => {
          evt.preventDefault()
          unsubscribe(userSubscriptions.id)
      }}>
        Unsubscribe
      </button>
      :
      <button 
        type="submit"
        className="subscribeBtn"
        onClick={evt => {
            evt.preventDefault()
            createNewSubscription()
        }}>
          Subscribe
        </button>
        }
      </>
  }