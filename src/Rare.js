import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"


//Function to set token state, Returns render NavBar and Application Views, passes token and setToken as props
export const Rare = () => {
  // from mozilla: The getItem() method of the Storage interface, when passed a key name, 
  // will return that key's value, or null if the key does not exist, in the given Storage object.
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  //what is the value of token when it's not an empty string? An object?

  // function setToken takes a single parameter of newToken
  // calls localStorage.setItem method, which takes two arguments, for a key ('auth_token') and value (newToken) 
  // Updates the values of setTokenState when invoked and passed an argument. Is invoked in components; Login (line 21 to login current user), 
  // Registration(line 33 to login new user), and NavBar(line 49 to logout).
  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }

  return <>
    <NavBar token={token} setToken={setToken} /> 
    <ApplicationViews token={token} setToken={setToken} />
  </>
}