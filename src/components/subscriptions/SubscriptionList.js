import { useEffect, useState } from "react"
import { getSubscribedPosts } from "../../managers/Posts"
import "./subscriptions.css"
import "../posts/Posts.css"
import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"

export const SubscriptionList = ({ token }) => {
  const [posts, setPosts] = useState([])
  const tokenInt = parseInt(token)
  const navigate = useNavigate()

  useEffect(() => {
    getSubscribedPosts(tokenInt).then((postData) => setPosts(postData))
  }, [])

  return (
    <>
      <article className="subscribe__container">
        <section className="addPostButton">
          New Post <button onClick={() => navigate("posts/newpost")}>+</button>
        </section>
        <section className="subscribe">
          {posts.length ? (
            <>
              {posts.map((post) => (
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
                    <section className="subscribe__footer">
                      <h3>
                        Author:{" "}
                        <Link to={`/users/${post.author.id}`}>
                          {post?.author?.full_name}
                        </Link>
                      </h3>
                    </section>
                  </section>
                </div>
              ))}
            </>
          ) : (
            <div className="subscribe__text">
              Subscribe to authors to curate your personal homepage!
            </div>
          )}
        </section>
      </article>
    </>
  )
}
