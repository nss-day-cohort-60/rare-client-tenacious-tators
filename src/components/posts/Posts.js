import { Link, useNavigate } from "react-router-dom";
import { HumanDate } from "../utils/HumanDate";


export const Posts = ({ post, token }) => {
  const navigate = useNavigate();

  return (
    <tr className="row">
      {parseInt(token) === post.user_id ? (
        <button
          className="row__button"
          onClick={() => navigate(`editpost/${post?.id}`)}
        >
          Edit
        </button>
      ) : null}
      <p>{""}</p>
      <td>
        <Link to={`/posts/${post?.id}`}>{post?.title}</Link>
      </td>
      <td>
        {post?.user?.first_name} {post?.user?.last_name}
      </td>
      <td>
        <HumanDate date={post.publication_date} />
      </td>
      <td>{post?.category?.label}</td>
      <td>{post?.tag?.label}</td>
    </tr>
  );
};
