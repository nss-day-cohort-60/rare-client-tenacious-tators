import { useEffect, useState } from "react"
import { addReactionToPost, getReactions, getReactionsForPost } from "../../managers/ReactionManager"
import "./reaction.css"

export const PostReactions = ({postId}) => {
    const [reactions, setReactions] = useState([
        {
            id: 0,
            label: "",
            emoji_url: "",
            emoji_icon:""
        }
    ])

    useEffect(() => {
        getReactionsForPost(postId)
        .then((data) => setReactions(data))
    }, [])

    return <>
    <section className="reaction__array">
        {
            reactions.map((reaction) => (
            <>
                <p className="reaction__count">{reaction.post_reaction_count}</p>
                    <button className="reaction__icon"
                    onClick={() =>
                        addReactionToPost({post: postId, reaction: reaction.id}).then(()=>getReactionsForPost(postId)).then((data) => setReactions(data))}>{reaction.emoji_icon}</button>
                    </>
                ))
        }
    </section>
    </>
}