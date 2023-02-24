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
                        <div class="title is-2">{post.title}</div>
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
                      <section className="myposts__footer">
                        <div className="buttonContainer">
                          <button class="button is-small"
                            onClick={() => navigate(`/posts/${post.id}/comments`)}
                          >
                            VIEW COMMENTS
                          </button>
                          <button class="button is-small"
                            onClick={() => navigate(`/posts/${post.id}/comment`)}
                          >
                            ADD COMMENT
                          </button>
                        </div>
                        <section>
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

