// import "./Animals.css"
import { Link } from "react-router-dom"

export const User = ({ user }) => (
    <section className="user">
        <h3 className="user__name">
            {/* <Link to={`/users/${user.id}`}> */}
            <span style={{ fontWeight: 'bold' }}><div>Username: { user.username }</div></span>
                <div>{ user.first_name } { user.last_name }</div>
                <div>{ user.email }</div>
            {/* </Link> */}
        </h3>
        <div className="user__breed">{ user.breed }</div>
    </section>
)
