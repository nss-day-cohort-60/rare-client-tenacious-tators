import { Link, useNavigate } from "react-router-dom";
import { HumanDate } from "../utils/HumanDate";

export const Posts = ({ posts, token, posttags }) => {
  const navigate = useNavigate();

  return (
    <tr className="row">
      {parseInt(token) === posts.user_id ? (
        <button
          className="row__button"
          onClick={() => navigate(`editpost/${posts?.id}`)}
        >
          Edit
        </button>
      ) : null}
      <p>{""}</p>
      <td>
        <Link to={`/posts/${posts?.id}`}>{posts?.title}</Link>
      </td>
      <td>
        {posts?.user?.first_name} {posts?.user?.last_name}
      </td>
      <td>
        <HumanDate date={posts.publication_date} />
      </td>
      <td>{posts?.category?.label}</td>
      <td>{posts?.tag?.label}</td>
    </tr >
  );
};
