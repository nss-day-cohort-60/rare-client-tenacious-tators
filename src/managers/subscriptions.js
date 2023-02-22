export const addSubscription = (id) => {
    return fetch(`http://localhost:8000/users/${id}/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("rare_token")}`,
            "Accept": "application/json"
        },
        body: JSON.stringify(id)
    })
    .then(res => res.json())
}
export const getSubscriptions = (id) => {
    return fetch(`http://localhost:8000/subscriptions?userId=${id}`)
        .then(res => res.json())
}
export const deleteSubscription = (id) => {
    return fetch(`http://localhost:8000/users/${id}/unsubscribe`, {
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("rare_token")}`
        }
    })
}