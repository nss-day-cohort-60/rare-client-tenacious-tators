import { useEffect, useState } from "react"
import { getSubscribedPosts } from "../../managers/Posts"
import "./subscriptions.css"
import "../posts/Posts.css"
import { Link, useNavigate } from "react-router-dom"
import { HumanDate } from "../utils/HumanDate"
import { PostReactions } from "../reactions/PostReactions";

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
        <section className="subscribe">
          {posts.length ? (
            <>
              {posts.map((post) => (
                  <div className="subscribe__posts">
                    <section className="subscribe__content">
                      <span style={{ fontWeight: "bold" }}>
                        <section className="subscribe__postheader">
                          <div className="posts_title">{post.title}</div>
                          <div className="posts_date">
                            Published On:{" "}
                            <HumanDate date={post.publication_date} />
                          </div>
                        </section>
                      </span>
                      <h3>{post?.category?.label}</h3>
                      <img className="subscribe__image hover" src={post?.image_url} />
                      <section className="subscribe__postbody">
                        <p>{post.content}</p>
                      </section>
                      <section>
                        <h3>
                          Author:{" "}
                          <Link to={`/users/${post.author.id}`}>
                            <div className="authorName">{post?.author?.full_name}</div>
                          </Link>
                        </h3>
                        <section className="myposts__footer">
                          <div className="buttonContainer">
                            <button className="button is-rounded is-small"
                              onClick={() => navigate(`/posts/${post.id}/comments`)}
                            >
                              View Comments
                            </button>
                            <button className="button is-rounded is-small"
                              onClick={() => navigate(`/posts/${post.id}/comment`)}
                            >
                              Add Comments
                            </button>
                          </div>
                          <section className="reactionsContainer">
                            <PostReactions postId={post.id} />
                          </section>
                      </section>
                    </section>
                  </section>
                </div>
              )
              )}
            </>)
            : (<>
              <div className="subscribe__text">Subscribe to authors to curate your personal homepage!</div>
            </>

            )}
        </section>
      </article>
    </>
  )
}

