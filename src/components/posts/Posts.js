import { Link } from "react-router-dom";

export const Posts = ({ post }) => (
  <tr>
    <td><Link to={`/posts/${post?.id}`}>
            { post?.title }
    </Link></td>
    <td>
      {post?.user?.first_name} {post?.user?.last_name}
    </td>
    <td>{post.publication_date}</td>
    <td>{post?.category?.label}</td>
  </tr>
);
