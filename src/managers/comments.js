export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8000/comments?postId=${id}`)
        .then(res => res.json())
  }