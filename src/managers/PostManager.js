
export const getSinglePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`)
    .then(res=>res.json())
}