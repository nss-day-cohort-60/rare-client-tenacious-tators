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
            <div className="tags">
                        {
                            tags.map(tag => <Tag key={tag.id} tag={tag} />)
                        }
            </div>
            <section className="category__create">
                    <h1 className="">Create a New Tag</h1>
                        <button className="category__button" onClick={() => navigate("create")}>+Add Category</button>
            </section>
        </div>
        </>
    )
    }