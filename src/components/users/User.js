import { Link } from "react-router-dom"

export const User = ({ user }) => (
    <section className="user">
        <h3 className="user__name">
                <Link to={`/users/${user.user.id}`}>
                    <h3>{ user.user.username }</h3>
                </Link>
                <div>{ user.full_name }</div>
                <div>{ user.user.email }</div>
        </h3>
    </section>
)
