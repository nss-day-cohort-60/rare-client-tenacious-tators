export const getCategories = () => {
  return fetch("http://localhost:8000/categories", {
    headers: {
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
  }).then((response) => response.json())
}

export const addNewCategory = (category) => {
  return fetch("http://localhost:8000/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
}
