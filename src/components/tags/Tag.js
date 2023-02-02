import { Link } from "react-router-dom";
import "./Tag.css"

export const Tag = ({ tag }) => (
    <article className="tags__individual">
        <div>
            <Link to={`/tags/${tag.id}`}>
                <h3 key={tag.id}>{tag.label}</h3>
            </Link>
                <button className="editButton">Edit</button>
                <button className="deleteButton">Delete</button>
        </div>
    </article>
)