export const getPosts = () => {
  return fetch("http://localhost:8000/posts").then((res) => res.json());
};

export const getSinglePost = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`).then((res) => res.json());
};

export const addNewPost = (post) => {
  return fetch("http://localhost:8000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
};

export const getCurrentUserPosts = (id) => {
  return fetch(`http://localhost:8000/posts?user_id=${id}`).then((res) =>
    res.json()
  );
};

export const deletePosts = (id) => {
  return fetch(`http://localhost:8000/posts/${id}`, {method: "DELETE"})
}
  
export const editPost = (id, postBody) => {
  return fetch(`http://localhost:8000/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postBody),
  });
};


export const getSubscribedPosts = (id) => {
  return fetch(`http://localhost:8000/posts?follower_id=${id}`, 
  {headers:{
    "Authorization": `Token ${localStorage.getItem("rare_token")}`
    }
  })
      .then(res => res.json())
}
