import { useEffect, useState } from "react"
import { getPostByCat } from "../../managers/Posts"
// import "./subscriptions.css"
// import "../posts/Posts.css"
import { Link, useNavigate, useParams } from "react-router-dom";
import { HumanDate } from "../utils/HumanDate";
import { PostReactions } from "../reactions/PostReactions";


export const CategoryPosts = ({ token }) => {
  const [catPosts, setCatPosts] = useState([])
  // const tokenInt = parseInt(token);
  const { categoryId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getPostByCat(categoryId).then((data) => setCatPosts(data))
  }, [])

  return (
    <>
      <article className="subscribe__container">
        <section className="subscribe">
          {catPosts.length ? (
            <>
              {catPosts.map((post) => (
                <div className="subscribe__posts">
                  <section className="subscribe__content">
                    <span style={{ fontWeight: "bold" }}>
                      <section className="subscribe__postheader">
                        <div>{post.title}</div>
                        <div>
                          Published On:{" "}
                          <HumanDate date={post.publication_date} />
                        </div>
                      </section>
                    </span>
                    <h3>{post?.category?.label}</h3>
                    <img className="subscribe__image" src={post?.image_url} />
                    <section className="subscribe__postbody">
                      <p>{post.content}</p>
                    </section>
                    <section>
                      <h3>
                        Author:{" "}
                        <Link to={`/users/${post.author.id}`}>
                          {post?.author?.full_name}
                        </Link>
                      </h3>
                <button onClick={() => navigate(`/posts/${post.id}/comments`)}>
                      VIEW COMMENTS
                    </button>
                    <button onClick={() => navigate(`/posts/${post.id}/comment`)}>ADD COMMENT</button>
                <section>
                      <PostReactions postId={post.id} />
                    </section>
                    </section>
                  </section>
                </div>
              ))}
            </>
          ) : (
            <div className="subscribe__text">
              There are no posts in this category yet! Make one yourself!
            </div>
          )}
        </section>
      </article>
    </>
  )
}
