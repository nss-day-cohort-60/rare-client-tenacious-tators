// Function that is being imported in "./auth/login"
// takes a single parameter of user
// POST http request to login that will send login user resource to server 
export const loginUser = (user) => {
  return fetch("http://localhost:8088/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  }).then(res => res.json())
}

// Function that is being imported in "./auth/register"
// takes a single parameter of newUser
// POST http request to register that will send new user resource to server 
export const registerUser = (newUser) => {
  return fetch("http://localhost:8088/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(newUser)
  }).then(res => res.json())
}
