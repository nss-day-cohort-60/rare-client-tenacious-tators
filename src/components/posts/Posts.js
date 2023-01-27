import { Link } from "react-router-dom";

export const Posts = ({ post }) => (
  <tr>
    <td>{post.title}</td>
    <td>
      {post?.author?.first_name}
      {post?.author?.last_name}
    </td>
    <td>{post.publication_date}</td>
    <td>{post?.category?.label}</td>
  </tr>
);
