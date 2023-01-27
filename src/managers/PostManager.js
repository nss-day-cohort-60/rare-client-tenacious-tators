export const getAllPosts = () => {
    fetch("http://localhost:8088/posts")
    .then(res=>res.json)
}
export const getSinglePost = (id) => {
    fetch(`http://localhost:8088/posts/${id}`)
    .then(res=>res.json)
}