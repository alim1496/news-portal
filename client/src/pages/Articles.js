import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import Auth from "../utils/auth";

const Articles = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("http://localhost:5000/api/v1/articles", {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => setArticles(res.data));
    };

    const deleteData = (id) => {
        if(!window.confirm("Do you want to delete it?")) return;
        fetch(`http://localhost:5000/api/v1/articles/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => {
            setArticles(articles.filter(a => a.id !== id));
        });
    };

    return (
        <div className="container mx-auto my-10">
            <div className="my-10">
                {articles && articles.map((article, index) => (
                    <div key={index} className="border border-gray-400 rounded px-4 py-4 mb-4">
                        <p>{article.title}</p>
                        <div className="flex">
                            <TimeAgo date={article.published} />
                            {article.status === 0 ? <p className="ml-4 text-blue-700">Pending</p> : <p className="ml-4 text-green-700">Published</p>}
                            <button type="button" className="ml-4 text-red-700 font-medium" onClick={() => deleteData(article.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Articles;
