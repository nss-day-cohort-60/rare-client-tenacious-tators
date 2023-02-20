import { useEffect, useState } from "react";
import { getCategories } from "../../managers/categories";
import "./Posts.css"

export const PostByCategory = ({ setSelectedCategory }) => {
    const [categories, setCategories] = useState([]);

    useEffect(
        () => {
            getCategories().then((categoryData) => setCategories(categoryData))
        }, [])

    return (
        <><section className="posts__dropdown">
            <label htmlFor="categories">Search By Category</label><br></br>
            <select onChange={(event) => { setSelectedCategory(parseInt(event.target.value)) }}>
                <option value="0" name="category_id" className="form-control" >View All</option>
                {categories.map(category => (
                    <option key={`category--${category.id}`} value={category.id}>
                        {category.label}
                    </option>
                )
                )}
            </select>
            </section>
        </>
    )
}