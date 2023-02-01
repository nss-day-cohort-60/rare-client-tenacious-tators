import { useState } from "react"
import { PostByAuthor } from "./PostByAuthor";
import { PostByCategory } from "./PostByCategory";
import { PostList } from "./PostList"


export const PostContainer = () => {
    const [selectedCategory, setSelectedCategory] = useState(0)
    const [authorChoice, setPostByAuthor] = useState(0);

    return <>
            <PostByAuthor setPostByAuthor={setPostByAuthor} />
            <PostByCategory setSelectedCategory={setSelectedCategory} />
            <PostList authorChoice={authorChoice} selectedCategory={selectedCategory}/>
        </>
}