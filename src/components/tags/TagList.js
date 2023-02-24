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
    <>
    <h1 className="tagHeader">Tags</h1>
    <section className="tagContainer">
      <section className="tagList">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag}
          setterFunction={setTags} />
        ))}
      </section>
      <section className="tag__create">
        <button className="button is-rounded" onClick={() => navigate("create")}>
          +Add Tag
        </button>
      </section>
    </section>
    </>
  )
}
