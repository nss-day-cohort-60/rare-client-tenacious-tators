import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"
import "./custom.css"

export const Posts = ({ posts, token }) => {
  const navigate = useNavigate()

  const limitedContent = posts.content.slice(0, 140) + "..."

  return (
    <>
      <div>
        <Link
          style={{ textDecoration: "none", color: "inherit" }}
          to={`/posts/${posts?.id}`}
          className="hover"
        >
          <div className="columns is-centered">
            <div className="column is-one-fifth"></div>
            <div className="column is-one-fifth">
              <a href="/categories">{posts.category?.label}</a>
              <br />
              <p
                className="title is-4 has-text-weight-bold is-margin"
                aria-label="breadcrumbs"
              >
                {posts?.title}
              </p>
              <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                {posts.author.full_name}
              </div>
              <div className="subtitle is-custom">
                <span style={{ margin: 0, padding: 0 }}>
                  <HumanDate date={posts.publication_date} />
                </span>
              </div>
            </div>
            <div className="column is-one-fifth">{limitedContent}</div>
            <div className="column is-one-fifth">
              <figure className="image is-16by9">
                <img className="postImg" src={posts.image_url} alt="Image 1"></img>
              </figure>
            </div>
            <div className="column is-one-fifth"></div>
          </div>
          <hr class="hr"></hr>
        </Link>
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
