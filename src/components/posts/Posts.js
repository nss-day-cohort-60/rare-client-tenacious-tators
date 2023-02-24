import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"

export const Posts = ({ posts, token, posttags }) => {
  const navigate = useNavigate()

  return (
    <>
      <div className="card">
        <div className="card-image">
          <figure className="image is-3by2">
            <img src={posts.image_url} alt="Image 1"></img>
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{posts.title}</p>
              <p className="subtitle is-6">{posts.author.full_name}</p>
            </div>
          </div>

          <div className="content">
            {posts.content}

            <a href="/categories">{posts.category.label}</a>

            <HumanDate date={posts.publication_date} />
          </div>
        </div>
      </div>
    </>
  )
}

/* ;<tr classNameName="row">
  {parseInt(token) === posts.user_id ? (
    <button
      classNameName="row__button"
      onClick={() => navigate(`editpost/${posts?.id}`)}
    >
      Edit
    </button>
  ) : null}
  <div>{""}</div>
  <td style={{ width: "200px" }}>
    <Link to={`/posts/${posts?.id}`}>{posts?.title}</Link>
  </td>
  <td>{posts.author.full_name}</td>
  <td>
    <HumanDate date={posts.publication_date} />
  </td>
  <td>{posts.category.label}</td>
  <td>{posts.tags.map((tag) => tag.label).join(", ")}</td>
</tr> */
