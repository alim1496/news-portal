import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { slugify } from "../utils/helper";

var page = 1;

const SingleDivision = () => {
    const [articles, setArticles] = useState([]);
    const [more, setMore] = useState(true);
    const { divID, divName } = useParams();
    const limit = 20;
    
    useEffect(() => {
        page = 1;
        setArticles([]);
        fetch(`http://localhost:5000/api/v1/articles/home/division/${divID}?page=${page}&limit=${limit}`)
        .then(res => res.json())
        .then(res => {
            setArticles(res.data);
        });
    }, [divID]);
    
    const fetchMore = () => {
        page++;
        fetch(`http://localhost:5000/api/v1/articles/home/division/${divID}?page=${page}&limit=${limit}`)
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
            <h2 className="my-2 font-bold text-lg text-center">{divName}</h2>
            <div className="flex flex-wrap justify-center mb-8">
                {articles && articles.map((article, index) => (
                    <div key={index} className="border mr-4 mb-4 w-1/5 bg-white">
                        <Link to={`/article/${article.id}/${slugify(article.title)}`}>
                            <img src={article.cover} alt="cover" style={{ height: 205 }} />
                            <h4 className="px-2 py-2 text-base font-mono font-semibold">{article.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
            {more && (
                <div className="text-center">
                    <button type="button" className="border px-8 py-2 mb-8 bg-white" onClick={fetchMore}>আরও লোড করুন</button>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default SingleDivision;
