import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const { articleID } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/articles/single/${articleID}`)
        .then(res => res.json())
        .then(res => setArticle(res.data[0]));
    }, [articleID]);

    return (
        <div className="container mx-auto max-w-3xl">
            <h1 className="my-4 text-2xl font-semibold font-mono">{article.title}</h1>
            <img src={article.cover} alt="cover" />
            <article className="font-mono my-4">{article.body}</article>
        </div>
    );
};

export default SingleArticle;
