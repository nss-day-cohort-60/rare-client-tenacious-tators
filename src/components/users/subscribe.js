import { addSubscription, deleteSubscription } from "../../managers/subscriptions"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"

export const SubscriptionForm = ({ authorId }) => {
  const [userSubscriptions, setUserSubscriptions] = useState({})
  const authToken = localStorage.getItem("auth_token")
  const token = JSON.parse(authToken)
  const tokenInt = parseInt(token)
  const navigate = useNavigate()
  const subscription = {
    follower_id: tokenInt,
    author_id: authorId
  }

  useEffect(()=>{
    fetch(`http://localhost:8000/subscriptions?follower_id=${tokenInt}`)
    .then(res=>res.json())
    .then(res=>{
      const filteredCopy = res.filter(obj=>obj.author_id === parseInt(authorId))
      if(filteredCopy.length>0){
        setUserSubscriptions(filteredCopy[0])
      }
    })}
  , [tokenInt])

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

    return <>
      {userSubscriptions.hasOwnProperty("id")
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