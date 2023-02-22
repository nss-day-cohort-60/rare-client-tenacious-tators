
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

  export const getTagById = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_token")}`,
      },
    }).then((response) => response.json())
  }

  export const updateTag = (tag, id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("rare_token")}`,
      },
      body: JSON.stringify(tag),
    })
  }

  export const deleteTag = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_token")}`,
      },
    })
  }