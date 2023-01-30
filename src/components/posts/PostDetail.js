import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getSinglePost } from "../../managers/PostManager"
import "./Posts.css"

export const PostDetail = ({token}) => {
    const [post, setPost] = useState({})
    const {postId} = useParams()
    

    useEffect(()=>{
        getSinglePost(postId)
        .then(setPost)
    }, [postId])

        return <div className="postDetail">
        <h1>{post.title}</h1>
        <h2>{post?.user?.username}</h2>
        <h3>{post?.category?.label}</h3>
        <h3>{post.publication_date}</h3>
        <p>{post.content}</p>
        {token?
        <div className="buttons">
            <button
            onClick={
                ()=>{}
            }>DELETE</button>
            <button
            onClick={
                ()=>{}
            }>EDIT</button>
        </div>
        :"" }
    </div>
}

//click on user name, it should be routed to user detail