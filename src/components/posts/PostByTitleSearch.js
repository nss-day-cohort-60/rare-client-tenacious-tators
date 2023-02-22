import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getSearchedPosts } from "../../managers/Posts";
import { PostByAuthor } from "./PostByAuthor";
import { PostByCategory } from "./PostByCategory";
import { PostList } from "./PostList"


export const PostByTitleSearch = ({setSearchTerms , setFiltered, searchTerms}) => {
    
    // const filterPosts = (filter) => {
    //     // setSearchTerms("Search Tickets")
    //     // toShowOrNotToShowSearch()
    //     return fetch (`http://localhost:8000/posts?${filter}`)
    //         .then((posts) => {
    //             setFiltered(posts)
    //         })
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
        getSearchedPosts(`${searchTerms}`).then((data) => setFiltered(data))
        setSearchTerms("Search Tickets")
        document.getElementById("search").value = "" 
    };
    
    const handleKeypress = e => {
          //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleSubmit();
        }
    };

    return <>
            <form><input type="textfield" placeholder={searchTerms}  id="search"
                onChange={(e) =>
                    setSearchTerms(e.target.value)}
                onKeyUp={handleKeypress}></input>
                <button type="submit"
                    onClick={handleSubmit}
                    >Go</button>
                </form>
            </>
}
