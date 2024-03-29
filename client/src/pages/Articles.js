import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
import Auth from "../utils/auth";
import { showEdit } from "../utils/helper";

var page = 1;

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [more, setMore] = useState(true);
    const limit = 50;

    useEffect(() => {
        page = 1;
        mainFetch(page); 
    }, []);

    const fetchMore = () => {
        page++;
        mainFetch(page);
    };

    const mainFetch = (_page) => {
        const pub = localStorage.getItem("admin-id");
        const role = localStorage.getItem("admin-role");
        fetch(`http://localhost:5000/api/v1/articles?page=${_page}&limit=${limit}&id=${pub}&role=${role}`, {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(({ data }) => {
            if(data.length < limit) {
                setMore(false);
            }
            setArticles(old => [...old, ...data]);
        });
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

    const changeTop = (e, id) => {
        if(!window.confirm("Are you confirmed to do this?")) return;
        const _top = e.target.checked ? 1 : 0;
        fetch(`http://localhost:5000/api/v1/articles/top/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ top: _top }),
            headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => {
            window.location.reload();
        });
    };

    return (
        <div className="container mx-auto my-10 bg-blue-50 px-8">
            <div className="my-10">
                {articles && articles.map((article, index) => (
                    <div key={index} className="bg-white border border-gray-400 rounded px-4 py-4 mb-4">
                        <p>{article.title}</p>
                        <div className="flex items-center">
                            <TimeAgo date={article.published} live={false} />
                            {article.status === 0 && <p className="ml-4 text-blue-700">Pending</p>}
                            {article.status === 1 && <p className="ml-4 text-green-700">Published</p>}
                            {article.status === 2 && <p className="ml-4 text-red-700">Rejected</p>}
                            {article.status === 3 && <p className="ml-4 text-yellow-700">Approved</p>}
                            {showEdit(parseInt(localStorage.getItem("admin-role")), article.status) && <Link to={`/admin/add/article/${article.id}`} target="_blank" className="ml-4 font-medium">Edit</Link>}
                            {parseInt(localStorage.getItem("admin-role")) === 4 && <button type="button" className="ml-4 text-red-700 font-medium" onClick={() => deleteData(article.id)}>Delete</button>}
                            {parseInt(localStorage.getItem("admin-role")) > 2 && article.status === 1 && (<>
                            <input checked={article.top === 1 ? true : false} onChange={(e) => changeTop(e, article.id)} type="checkbox" id="checkTop" className="bg-gray-50 mr-2 ml-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"/>
                            <label htmlFor="checkTop" className="block text-lg text-gray-900">Top</label> </>)}
                        </div>
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
}

export default Articles;
