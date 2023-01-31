import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTags } from "../../managers/tags"
import { Tag } from "./Tag"
import "./Tag.css"

export const TagList = () => {
    const [tags, setTags] = useState([])
    const navigate = useNavigate()

    useEffect(
        () => {
            getTags()
            .then((tagArray) => setTags(tagArray))
        },
        []
    )

    return (
        <>
        <div style={{ marginTop: "2rem" }}>
            <button onClick={() => navigate("/tags/create")}>
            Create Tag
            </button>
            <div className="tags">
                        {
                            tags.map(tag => <Tag key={tag.id} tag={tag} />)
                        }
            </div>
        </div>
        </>
    )
    }