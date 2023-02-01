import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getTags } from "../../managers/tags"
import { Tag } from "./Tag"
import "./Tag.css"

export const TagList = ({ token }) => {
  const [tags, setTags] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getTags().then((tagArray) => setTags(tagArray))
  }, [])

  return (
    <section className="tagContainer">
      <section className="tagList">
        <h1 className="tagHeader">Tags</h1>
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </section>
      <section className="tag__create">
        <h1 className="">Create a New Tag</h1>
        <button className="tag__button" onClick={() => navigate("create")}>
          +Add Tag
        </button>
      </section>
    </section>
  )
}
