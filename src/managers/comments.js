export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8000/comments?postId=${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("rare_token")}`,
        },
    })
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


    export const updateComment = (comment, id) => {
        return fetch(`http://localhost:8000/comments/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("rare_token")}`,
          },
          body: JSON.stringify(comment),
        })
      }