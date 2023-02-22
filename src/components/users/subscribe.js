import { addSubscription, deleteSubscription } from "../../managers/subscriptions"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { getUserById } from "../../managers/users"

export const SubscriptionForm = ({ user , setUser }) => {
  const authToken = localStorage.getItem("rare_token")

    return <>
      {
        user.subscribed 
        ?
            <button
            onClick={() => {
                deleteSubscription(user.id)
                .then(() => {
                  getUserById(user.id)
                  .then(setUser)
                })
            }}>Unsubscribe</button>
        :
            <button
            onClick={() => {
                addSubscription(user.id)
                .then(() => {
                  getUserById(user.id)
                  .then(setUser)
                })
            }}>Subscribe</button>
      }
    </>
  }