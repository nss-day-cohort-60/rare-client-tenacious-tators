export const getCategories = () => {
  return fetch("http://localhost:8000/categories", {
    headers: {
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
  }).then((response) => response.json())
}

export const getCategoryById = (id) => {
  return fetch(`http://localhost:8000/categories/${id}`, {
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
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
    body: JSON.stringify(category),
  })
}

export const updateCategory = (category, id) => {
  return fetch(`http://localhost:8000/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
    body: JSON.stringify(category),
  })
}

export const deleteCategory = (id) => {
  return fetch(`http://localhost:8000/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("rare_token")}`,
    },
  })
}
