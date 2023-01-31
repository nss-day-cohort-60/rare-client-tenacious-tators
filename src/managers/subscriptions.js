export const addSubscription = subscription => {
    return fetch("http://localhost:8088/subscriptions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    })
}

export const deleteSubscription = (subscriptionId) => {
    return fetch(`http://localhost:8088/subscriptions/${subscriptionId}`, {
        method: "DELETE"
    })
}