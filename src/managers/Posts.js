export const getPosts = () => {
  return fetch("http://localhost:8088/posts").then((res) => res.json());
};
