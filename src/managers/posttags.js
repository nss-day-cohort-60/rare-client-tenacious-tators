export const getPostTags = () => {
    return fetch("http://localhost:8000/posttags"), {
      headers: {
        Authorization: `Token ${localStorage.getItem("rare_token")}`,
      },
    }
        .then(res => res.json())
}

export const addNewTag = (posttag) => {
    return fetch("http://localhost:8000/posttags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posttag),
    });
  };