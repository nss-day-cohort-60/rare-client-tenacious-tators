import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getSinglePost } from "../../managers/PostManager"

export const PostDetail = ({token}) => {
    const [post, setPost] = useState({})
    const {postId} = useParams()
    

    useEffect(()=>{
        getSinglePost(postId)
        .then((post)=>setPost(post))
    }, [postId])

        return <>hi</>
    //<div>
    //     <title>{post.title}</title>
    //     <h2>{post.author}</h2>
    //     <h3>{post.category}</h3>
    //     <h3>{post.date}</h3>
    //     <p>{post.content}</p>
    //     {token?
    //     <div className="buttons">
    //         <button
    //         onClick={
    //             ()=>{}
    //         }>DELETE</button>
    //         <button
    //         onClick={
    //             ()=>{}
    //         }>EDIT</button>
    //     </div>
    //     :"" }
    // </div>
}