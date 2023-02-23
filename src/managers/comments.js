export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8000/comments?postId=${id}`)
        .then(res => res.json())
  }

  export const createNewComment = (postbody) => {
    return fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(postbody)
    })
    }