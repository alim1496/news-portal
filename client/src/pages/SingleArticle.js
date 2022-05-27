import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { parseDate, slugify } from "../utils/helper";
import angry from "../assets/angry.png";
import crying from "../assets/crying.png";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import heart from "../assets/heart.png";
import laugh from "../assets/laughing.png";
import clap from "../assets/clapping.png";
import Footer from "../components/Footer";

const SingleArticle = () => {
    const [article, setArticle] = useState({});
    const [similar, setSimilar] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [emo, setEmo] = useState(0);
    const [reactID, setReactID] = useState(0);
    const { articleID } = useParams();

    useEffect(() => {
        setArticle({});
        setSimilar([]);
        setEmo(0);
        setReactID(0);

        fetch(`http://localhost:5000/api/v1/articles/single/${articleID}`)
        .then(res => res.json())
        .then(res => {
            setArticle(res.data[0]);
            fetchSimilar(res.data[0].category_id);
        });

        fetchReaction();
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

    const fetchReaction = () => {
        if(!window.user || window.user === null) return;
        fetch(`http://localhost:5000/api/v1/reactions?article_id=${articleID}&user_id=${window.user.id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("user-token")}` }
        })
        .then(res => res.json())
        .then(({message}) => {
            if(message.length > 0) {
                setEmo(message[0].type);
                setReactID(message[0].id);
            }
        });
    };

    const submitReaction = (re) => {
        if(!window.user || window.user === null) alert("Please Login First");
        const result = re === emo ? 0 : re;
        const method = emo !== 0 || result === 0 ? 'PATCH' : 'POST';
        const url = method === 'POST' ? "http://localhost:5000/api/v1/reactions" : `http://localhost:5000/api/v1/reactions/${reactID}`;
        fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("user-token")}` },
            body: JSON.stringify({ type: result, article_id: articleID, user_id: window.user.id })
        })
        .then(res => res.json())
        .then(res => {
            setEmo(result);
        });
    };

    return (
        <div className="container mx-auto max-w-4xl">
            <div className="flex">
                <div className="w-2/3 mb-8">
                    <h1 className="mb-2 text-2xl font-semibold font-mono">{article.title}</h1>
                    <p className="mb-2 text-sm font-mono">{parseDate(article.published)}</p>
                    <img src={article.cover} alt="cover" />
                    <article className="font-mono font-normal my-4">{article.body}</article>
                    <div className="bg-white flex justify-evenly align-center py-6 border round-xl">
                        <div>
                            <img src={like} alt="like" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(1)} />
                            {emo === 1 && <hr className="mt-2 border-black" />}
                        </div>
                        <div>
                            <img src={dislike} alt="dislike" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(2)} />
                            {emo === 2 && <hr className="mt-2 border-black" />}
                        </div>
                        <div>
                            <img src={clap} alt="clap" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(3)} />
                            {emo === 3 && <hr className="mt-2 border-black" />}
                        </div>
                        <div>
                            <img src={heart} alt="heart" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(4)} />
                            {emo === 4 && <hr className="mt-2 border-black" />}
                        </div>
                        <div>
                            <img src={laugh} alt="laugh" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(5)} />
                            {emo === 5 && <hr className="mt-2 border-black" />}
                        </div>
                        <div>
                            <img src={crying} alt="crying" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(6)} />
                            {emo === 6 && <hr className="mt-2 border-black" />}
                        </div>
                        <div>
                            <img src={angry} alt="angry" className="hover:cursor-pointer hover:opacity-50" onClick={() => submitReaction(7)} />
                            {emo === 7 && <hr className="mt-2 border-black" />}
                        </div>
                    </div>
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
                            <div key={index} className="flex border mb-4 bg-white">
                                <img src={sim.cover} className="w-1/2" alt="cover" />
                                <h4 className="px-2 py-2 w-1/2 text-sm font-mono font-medium">{sim.title}</h4>
                            </div>
                        </Link>
                    ))}
                </div>            
            </div>
            <Footer />
        </div>
    );
};

export default SingleArticle;
