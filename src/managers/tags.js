
export const getTags = () => {
    return fetch("http://localhost:8000/tags")
        .then(res => res.json())
}

export const addNewTag = tag => {
    return fetch("http://localhost:8000/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tag)
    })
  }