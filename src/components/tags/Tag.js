
export const Tag = ({ tag }) => (
    <section className="tag">
            <h3 className="tag_label" key={ tag.id }>
                { tag.label }
            </h3>
            <button className="editButton">Edit</button>
            <button className="deleteButton">Delete</button>
    </section>
)