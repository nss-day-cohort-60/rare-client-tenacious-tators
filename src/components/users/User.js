import { Link } from "react-router-dom"
import { SubscriptionForm } from "./subscribe"

export const User = ({ user , setUsers }) => (
    <section className="user__card" key={user.id}>
        <img src={user.profile_image_url} className="user card__image"/>
        <h3 className="user__name">
                <Link to={`/users/${user.user.id}`}>
                    <h3 className="user__name">{ user.full_name }</h3>
                </Link>
                <div className="user card__subtitle">{ user.followers_count } other users follow this author</div>
                <div className="user card__subtitle">{ user.user.email }</div>
                <SubscriptionForm user={user} setUsers={setUsers}/>

        </h3>
    </section>
)
