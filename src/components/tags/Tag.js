import { Link } from "react-router-dom";
import "./Tag.css"

export const Tag = ({ tag }) => (
    <article className="tags">
        <div>
        <Link to={`/tags/${tag.id}`}>
            <h3 className="tag_label" key={ tag.id }>
                { tag.label }
            </h3>
            </Link>
            <button className="editButton">Edit</button>
            <button className="deleteButton">Delete</button>
        </div>
    </article>
)