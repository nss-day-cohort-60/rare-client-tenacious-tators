
export const getTags = () => {
    return fetch("http://localhost:8088/tags")
        .then(res => res.json())
}