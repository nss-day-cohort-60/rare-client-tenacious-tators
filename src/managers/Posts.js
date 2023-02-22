export const getPosts = () => {
  return fetch("http://localhost:8000/posts", {
    headers: {
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
  }).then((res) => res.json())
}

export const getSinglePost = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`, 
  {
    headers: {
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  }).then((res) => res.json())
}

export const addNewPost = (post) => {
  return fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`

    },
    body: JSON.stringify(post),
  })
}

export const getCurrentUserPosts = () => {
  return fetch(`http://localhost:8000/posts?user`,
    {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }
    })
    .then(res => res.json())
};

export const deletePosts = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
  })
}


export const editPost = (post, id) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("rare_token")}`
    },
    body: JSON.stringify(post),
  });
};

export const getSubscribedPosts = () => {
  return fetch(`http://localhost:8000/posts?subscribed=true`,
    {
      headers: {
        "Authorization": `Token ${localStorage.getItem("rare_token")}`
      }
    })
    .then(res => res.json())
  
}


