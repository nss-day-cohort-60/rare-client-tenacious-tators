import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { PostList } from "../components/posts/PostList";
import { MyPosts } from "../components/posts/MyPosts";
import { NewPost } from "../components/posts/NewPost";
import { PostDetail } from "../components/posts/PostDetail";
import { Categories } from "../components/categories/Categories";
import { TagList } from "../components/tags/TagList";
import { UserList } from "../components/users/UserList";
import { UserDetails } from "../components/users/UserDetails";
import { CommentList } from "../components/comments/CommentList";
import { SubscriptionList } from "../components/subscriptions/SubscriptionList";
import { NewCategory } from "../components/categories/NewCategory";
import { NewTag } from "../components/tags/NewTag";

// receiving 2 props from Rare.js
// responsible for routing users to specific views depending on URL paths
export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        {/* creating path for login & register */}
        {/* passing setToken prop from Rare.js to Login & Register  */}
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/">
          <Route index element={<SubscriptionList token={token}/>} />
        </Route>
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/posts">
            <Route index element={<PostList />} />
            <Route path="myposts" element={<MyPosts token={token} />} />
            <Route path=":postId" element={<PostDetail token={token} />} />
            <Route path=":postId/comments" element={<CommentList />} />
          </Route>
          <Route path="/categories">
            <Route index element={<Categories />} />
            <Route path="create" element={<NewCategory />} />
          </Route>
          <Route path="/tags">
            <Route index element={<TagList />} />
            <Route path="create" element={<NewTag />} />
          </Route>
          <Route path="/users">
            <Route index element={<UserList />} />
            <Route path=":userId" element={<UserDetails />} />
          </Route>
          </Route>
    </Routes>
  </>
  )
}
