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

  const mostRecentPost = posts[0]
  const secondPost = posts[1]
  const allOtherPosts = posts.slice(2)

  return (
    <>
      <article className="subscribePostsPage">
        {posts.length ? (
          <div className="subscribePostsContainer">
            <div class="columns">

              <div className="asubscribe__posts column is-three-fifths">
                <section className="subscribe__content">
                  <span style={{ fontWeight: "bold" }}>
                    <section className="subscribe__postheader">
                      <div>Most Recent Post...</div>
                      <div className="posts_title">{mostRecentPost.title}</div>
                      <div className="posts_date">
                        Published On:{" "}
                        <HumanDate date={mostRecentPost.publication_date} />
                      </div>
                    </section>
                  </span>
                  <h3>{mostRecentPost?.category?.label}</h3>
                  <img className="subscribe__image hover" src={mostRecentPost?.image_url} />
                  <section className="subscribe__postbody">
                    <p>{mostRecentPost.content}</p>
                  </section>
                  <section>
                    <h3>
                      Author:{" "}
                      <Link to={`/users/${mostRecentPost.author.id}`}>
                        <div className="authorName">{mostRecentPost?.author?.full_name}</div>
                      </Link>
                    </h3>
                    <div className="buttonContainer">
                      <button className="viewCommentsButton"
                        onClick={() => navigate(`/posts/${mostRecentPost.id}/comments`)}
                      >
                        View Comments
                      </button>
                      <button className="addCommentsButton"
                        onClick={() => navigate(`/posts/${mostRecentPost.id}/comment`)}
                      >
                        Add Comments
                      </button>
                    </div>
                    <section className="reactionsContainer">
                      <PostReactions postId={mostRecentPost.id} />
                    </section>
                  </section>
                </section>
              </div>

              <div className="secondPostContainer">
                <section className="column">
                  <span style={{ fontWeight: "bold" }}>
                    <div className="side_posts_title">{secondPost.title}</div>
                    <div className="posts_date">
                      Published On:{" "}
                      <HumanDate date={secondPost.publication_date} />
                    </div>
                  </span>
                  <h3>{secondPost?.category?.label}</h3>
                  <img className="subscribe__image hover" src={secondPost?.image_url} />
                  <section className="subscribe__postbody">
                    <div className="column">{secondPost.content}</div>
                  </section>
                  <section>
                    <h3>
                      Author:{" "}
                      <Link to={`/users/${secondPost.author.id}`}>
                        <div className="authorName">{secondPost?.author?.full_name}</div>
                      </Link>
                    </h3>
                    <div className="buttonContainer">
                      <button className="viewCommentsButton"
                        onClick={() => navigate(`/posts/${secondPost.id}/comments`)}
                      >
                        View Comments
                      </button>
                      <button className="addCommentsButton"
                        onClick={() => navigate(`/posts/${secondPost.id}/comment`)}
                      >
                        Add Comments
                      </button>
                    </div>
                    <section className="reactionsContainer">
                      <PostReactions postId={secondPost.id} />
                    </section>
                  </section>
                </section>
              </div>
            </div>

            <div className="rowPostsContainer">
              {allOtherPosts.map((post) => (
                <div className="bottomPosts">
                  <div className="columns is-centered">
                    <div className="column is-two-fifth">
                      <a href="/categories">{post.category?.label}</a>
                      <br />
                      <p
                        className="title is-4 has-text-weight-bold is-margin"
                        aria-label="breadcrumbs"
                      >
                        {post?.title}
                      </p>
                      <div className="subtitle is-6 has-text-weight-semibold is-custom-margin">
                        {post?.author?.full_name}
                      </div>
                      <div className="subtitle is-custom">
                        <span style={{ margin: 0, padding: 0 }}>
                          <HumanDate date={post.publication_date} />
                        </span>
                      </div>
                      <div className="buttonContainer">
                        <button className="viewCommentsButton"
                          onClick={() => navigate(`/posts/${post.id}/comments`)}
                        >
                          View Comments
                        </button>
                        <button className="addCommentsButton"
                          onClick={() => navigate(`/posts/${post.id}/comment`)}
                        >
                          Add Comments
                        </button>
                        <section className="reactionsContainer">
                          <PostReactions postId={post.id} />
                        </section>
                      </div>
                    </div>
                    <div className="column is-three-fifth">{post.content}</div>
                    <div className="column is-two-fifth">
                      <img id="image" src={post.image_url} alt="Image 1"></img>
                    </div>
                    <hr class="hr"></hr>
                  </div>
                </div>

              )
              )}</div>
          </div>
        )
          : (<>
            <div className="subscribe__text">Subscribe to authors to curate your personal homepage!</div>
          </>

          )}
      </article>
    </>
  )
}

