export const getSubscriptions = (id) => {
    return fetch(`http://localhost:8088/subscriptions?userId=${id}`)
        .then(res => res.json())
}