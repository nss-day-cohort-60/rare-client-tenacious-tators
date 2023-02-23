export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8000/comments?postId=${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("rare_token")}`,
        },
    })
        .then(res => res.json())
  }