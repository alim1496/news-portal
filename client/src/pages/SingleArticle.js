import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { parseDate, slugify } from "../utils/helper";

const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const [similar, setSimilar] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
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

        fetchComments();

    }, [articleID]);

    const fetchComments = () => {
        setComments([]);
        fetch(`http://localhost:5000/api/v1/comments/${articleID}`)
        .then(res => res.json())
        .then(({ data }) => {
            setComments(data);
        });
    };

    const submitComment = () => {
        if(comment === "") return;
        if(!window.user || window.user === null) alert("Please Login First");
        
        fetch("http://localhost:5000/api/v1/comments", {
            method: "POST",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("user-token")}` },
            body: JSON.stringify({ title: comment, article_id: articleID, user_id: window.user.id })
        })
        .then(res => res.json())
        .then(res => {
            setComment("");
            fetchComments();
        });
    };

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
                <h3 className="mt-8 mb-2 font-mono text-lg font-semibold">মতামত</h3>
                <textarea rows={5} className="w-full border-2 border-black p-4" value={comment} onChange={e => setComment(e.target.value)} />
                <button type="button" className="my-2 bg-blue-700 text-white py-2 px-8 text-sm hover:bg-blue-800" onClick={submitComment}>পোস্ট করুন</button>
                <div className="my-6">
                    {comments && comments.map((com, index) => (
                        <div key={index} className="mb-4 font-mono">
                            <h3 className="font-semibold">{com.fullname}</h3>
                            <span className="text-xs font-light">{parseDate(com.posted)}</span>
                            <p className="text-base">{com.title}</p>
                        </div>
                    ))}
                </div>
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
