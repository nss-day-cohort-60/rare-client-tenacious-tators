import { Link } from "react-router-dom";
import { HumanDate } from "../utils/HumanDate"
import { SearchByAuthor } from "./SearchByAuthor"

export const Posts = ({ post }) => (
  <tr>
    <td><Link to={`/posts/${post?.id}`}>
            { post?.title }
    </Link></td>
    <td>
      {post?.user?.first_name} {post?.user?.last_name}
    </td>
    <td><HumanDate date={post.publication_date}/></td>
    <td>{post?.category?.label}</td>
  </tr>
);
