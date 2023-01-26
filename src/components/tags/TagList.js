
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
            .then((tagArray) => {
            setTags(tagArray.sort((a,b) => {const nameA = a.label;
                const nameB = b.label; if (nameA < nameB){ return -1;} if (nameA > nameB) {return 1;} return 0}))
            })
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