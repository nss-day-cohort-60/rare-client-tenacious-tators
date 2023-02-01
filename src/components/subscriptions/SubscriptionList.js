import { useEffect, useState } from "react";
import { getSubscribedPosts } from "../../managers/Posts";
import "./subscriptions.css"
import "../posts/Posts.css"


export const SubscriptionList = ({ token }) => {
    const [posts, setPosts] = useState([]);
    const tokenInt = parseInt(token);

    useEffect(() => {
      getSubscribedPosts(tokenInt).then((postData) => setPosts(postData));
    }, []);

  return <>
  <section className="subscribe">
    { 
      (posts.length) 
        ? <>
            {posts.map((post) => (
              <div className="subscribe__posts">
                <h1>{post.title}</h1>
                <h2>{post?.user?.username}</h2>
                <h3>{post?.category?.label}</h3>
                <h3>{post.publication_date}</h3>
                <p>{post.content}</p>
                </div>
              )
            )}
            </>
        : <div className="subscribe__text">Subscribe to authors to curate your personal homepage!</div>
    }
   </section> </>
  }
