import { Link } from "react-router-dom"

export const User = ({ user }) => (
    <section className="user">
        <h3 className="user__name">
                <Link to={`/users/${user.id}`}>
                    <h3>{ user.username }</h3>
                </Link>
                <div>{ user.first_name } { user.last_name }</div>
                <div>{ user.email }</div>
        </h3>
        <div className="user__breed">{ user.breed }</div>
    </section>
)
