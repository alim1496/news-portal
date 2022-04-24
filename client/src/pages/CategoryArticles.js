import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryArticles = () => {
    const [articles, setArticles] = useState([]);
    const { catID, catName } = useParams();
    const limit = 20;
    let page = 1;
    
    useEffect(() => {
        setArticles([]);
        fetch(`http://localhost:5000/api/v1/articles/category/${catID}?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(res => setArticles(res.data));
    }, [catID, catName]);
    
    return (
        <div className="container mx-auto">
            <h2 className="my-2 font-bold text-lg text-center">{catName}</h2>
            <div className="flex flex-wrap justify-center">
                {articles && articles.map((article, index) => (
                    <div key={index} className="border mr-4 mb-4 w-1/5 bg-gray-200">
                        <Link to={`/article/${article.id}`}>
                            <img src={article.cover} alt="cover" />
                            <h4 className="px-2 py-2 text-base font-mono font-semibold">{article.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryArticles;
