export const getPostTags = () => {
    return fetch("http://localhost:8088/posttags")
        .then(res => res.json())
}

export const addNewTag = (posttag) => {
    return fetch("http://localhost:8088/posttags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(posttag),
    });
  };