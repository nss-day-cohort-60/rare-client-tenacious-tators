export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
}

export const getSinglePost = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`)
  .then(res=>res.json())
}

export const addNewPost = post => {
  return fetch("http://localhost:8088/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(post)
  })
}

export const getCurrentUserPosts = (id) => {
  return fetch(`http://localhost:8088/posts?user_id=${id}`).then((res) =>
    res.json()
  );
};


export const deletePosts = (id) => {
  return fetch(`http://localhost:8088/posts/${id}`, {method: "DELETE"})
}