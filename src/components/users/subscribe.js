import { addSubscription, deleteSubscription } from "../../managers/subscriptions"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { getUserById, getUsers } from "../../managers/users"

export const SubscriptionForm = ({ user , setUser, setUsers }) => {
  
  return <>
      {
        user.subscribed 
        ?
            <button className="button is-warning users__follow_button" width="fit-content"
            onClick={() => {
                deleteSubscription(user.id)
                .then(() => {
                  getUserById(user.id)
                  .then(setUser)
                })
                .then(() => {
                  getUsers()
                  .then(setUsers)
                })
            }}>Unfollow</button>
        :
            <button className="button is-primary users__follow_button"
            onClick={() => {
                addSubscription(user.id)
                .then(() => {
                  getUserById(user.id)
                  .then(setUser)
                })
                .then(() => {
                  getUsers()
                  .then(setUsers)
                })
            }}>Follow</button>
      }
    </>
  }