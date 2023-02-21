
export const getTags = () => {
    return fetch("http://localhost:8000/tags", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
      },
    })
        .then(res => res.json())
}

export const addNewTag = tag => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
      },
      body: JSON.stringify(tag)
    })
  }