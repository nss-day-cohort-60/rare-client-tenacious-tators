export const getCommentsByPostId = (id) => {
    return fetch(`http://localhost:8088/comments?postId=${id}`)
        .then(res => res.json())
  }