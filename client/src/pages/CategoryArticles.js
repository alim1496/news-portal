import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { slugify } from "../utils/helper";

var page = 1;

const CategoryArticles = () => {
    const [articles, setArticles] = useState([]);
    const [more, setMore] = useState(true);
    const { catID, catName } = useParams();
    const limit = 20;
    
    useEffect(() => {
        page = 1;
        setArticles([]);
        fetch(`http://localhost:5000/api/v1/articles/category/${catID}?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(res => {
            setArticles(res.data);
        });
    }, [catID, catName]);
    
    const fetchMore = () => {
        page++;
        fetch(`http://localhost:5000/api/v1/articles/category/${catID}?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(({ data }) => {
            if(data.length < limit) {
                setMore(false);
            }
            setArticles(old => [...old, ...data]);
        });
    };

    return (
        <div className="container mx-auto">
            <h2 className="my-2 font-bold text-lg text-center">{catName}</h2>
            <div className="flex flex-wrap justify-center mb-8">
                {articles && articles.map((article, index) => (
                    <div key={index} className="border mr-4 mb-4 w-1/5 bg-gray-200">
                        <Link to={`/article/${article.id}/${slugify(article.title)}`}>
                            <img src={article.cover} alt="cover" />
                            <h4 className="px-2 py-2 text-base font-mono font-semibold">{article.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
            {more && (
                <div className="text-center">
                    <button type="button" className="border px-8 py-2 mb-8" onClick={fetchMore}>আরও লোড করুন</button>
                </div>
            )}
        </div>
    );
};

export default CategoryArticles;
