import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Posts } from "../components/posts/Posts"
import { MyPosts } from "../components/posts/MyPosts"
import { PostDetail } from "../components/posts/PostDetail"
import { Categories } from "../components/categories/Categories"
import { Tags } from "../components/tags/Tag"
import { UserList } from "../components/users/UserList"

// receiving 2 props from Rare.js
// responsible for routing users to specific views depending on URL paths
export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      {/* creating path for login & register */}
      {/* passing setToken prop from Rare.js to Login & Register  */}
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        <Route path="/posts/" >
          <Route element={<Posts />} />
          <Route path="myposts" element={<MyPosts />} />
          <Route path="details/:postId" element={<PostDetail token={token} />} />
        </Route>
        <Route path="/categories" element={<Categories />} />
        <Route path="/tags" element={<Tags />} />
        <Route path="/users">
          <Route index element={<UserList />} />
        </Route>
      </Route>
    </Routes>
  </>
}
