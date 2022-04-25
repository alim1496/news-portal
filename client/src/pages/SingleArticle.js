import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { parseDate, slugify } from "../utils/helper";

const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const [similar, setSimilar] = useState([]);
    const { articleID } = useParams();

    useEffect(() => {
        setArticle({});
        setSimilar([]);
        fetch(`http://localhost:5000/api/v1/articles/single/${articleID}`)
        .then(res => res.json())
        .then(res => {
            setArticle(res.data[0]);
            fetchSimilar(res.data[0].category_id);
        });
    }, [articleID]);

    const fetchSimilar = (catID) => {
        fetch(`http://localhost:5000/api/v1/articles/similar/${catID}?excl=${articleID}`)
        .then(res => res.json())
        .then(res => setSimilar(res.data));
    };

    return (
        <div className="container mx-auto max-w-4xl flex">
            <div className="w-2/3 mb-8">
                <h1 className="mb-2 text-2xl font-semibold font-mono">{article.title}</h1>
                <p className="mb-2 text-sm font-mono">{parseDate(article.published)}</p>
                <img src={article.cover} alt="cover" />
                <article className="font-mono font-normal my-4">{article.body}</article>
            </div>
            <div className="w-1/3 ml-8 mt-12">
                <h3 className="text-xl font-semibold mb-4">এরকম আরও</h3>
                {similar && similar.map((sim, index) => (
                    <Link to={`/article/${sim.id}/${slugify(sim.title)}`}>
                        <div key={index} className="flex border mb-4 bg-gray-200">
                            <img src={sim.cover} className="w-1/2" alt="cover" />
                            <h4 className="px-2 py-2 w-1/2 text-sm font-mono font-medium">{sim.title}</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SingleArticle;
