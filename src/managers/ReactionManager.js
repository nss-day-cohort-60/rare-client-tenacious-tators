export const getReactionsForPost = (id) => {
    return fetch(`http://localhost:8000/reactions?post=${id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("rare_token")}`,
        },
      }).then((res) => res.json())
}

export const addReactionToPost = (postbody) => {
    return fetch("http://localhost:8000/postreactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("rare_token")}`,
      },
      body: JSON.stringify(postbody),
    });
  };