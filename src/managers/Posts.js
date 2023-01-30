export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};

export const getCurrentUserPosts = (id) => {
  return fetch(`http://localhost:8088/posts?user_id=${id}`).then((res) =>
    res.json()
  );
};
