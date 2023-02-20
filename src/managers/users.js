
export const getUsers = () => {
    return fetch("http://localhost:8000/users")
        .then(res => res.json())
  }

export const getUsersBySearchTerm = (searchTerm) => {
  return fetch(`http://localhost:8000/users?search=${searchTerm}`)
      .then(res => res.json())
}

export const getUserById = (id) => {
  return fetch(`http://localhost:8000/users/${id}`)
      .then(res => res.json())
}

export const addUser = user => {
  return fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
}

export const updateUser = user => {
  return fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
  })
}

export const releaseUser = (userId) => {
  return fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE"
  })
}