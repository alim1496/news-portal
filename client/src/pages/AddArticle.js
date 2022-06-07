import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Auth from "../utils/auth";

const AddArticle = () => {
    const [categories, setCategories] = useState([]);
    const [divisions, setDivisions] = useState([]);
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState(0);
    const [division, setDivision] = useState(0);
    const [status, setStatus] = useState(0);
    const [featured, setFeatured] = useState(false);
    const { slug } = useParams();

    useEffect(() => {
        fetchCategories();
        fetchDivisions();
        if(slug) fetchArchive();
    }, [slug]);

    const fetchArchive = () => {
        fetch(`http://localhost:5000/api/v1/articles/${slug}`, {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(({ data }) => {
            setTitle(data.title);
            setCover(data.cover);
            setBody(data.body);
            setStatus(data.status);
            setCategory(data.category_id);
        });
    };

    const fetchCategories = () => {
        fetch("http://localhost:5000/api/v1/categories", {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => setCategories(res.data));
    };

    const fetchDivisions = () => {
        fetch("http://localhost:5000/api/v1/categories/divisions", {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => setDivisions(res.data));
    };

    const submitData = () => {
        if(!title || !cover || !body) return;

        const pub = localStorage.getItem("admin-id");
        const method = slug ? 'PATCH' : 'POST';
        const url = slug ? `http://localhost:5000/api/v1/articles/${slug}` : 'http://localhost:5000/api/v1/articles';
        const data = {
            title, body, cover, featured: featured ? 1 : 0, status, category_id: category, published_by: pub, division_id: division
        };
        
        fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}`},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            const { Error } = res;
            if(slug) updateResponse(Error);
            else addResponse(Error);
        });
    };

    const updateResponse = (Error) => {
        if(Error) {
            alert("Could not update article");
        } else {
            alert("Article updated successfully");
            window.location.reload();
        }
    };

    const addResponse = (Error) => {
        if(Error) {
            alert("Could not add article");
        } else {
            setCategory(0);
            setDivision(0);
            setTitle("");
            setBody("");
            setCover("");
            setStatus(0);
            setFeatured(false);
            alert("Article added successfully")
        }
    };

    return (
        <div className="container mx-auto my-10 bg-blue-50">
            <form>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900">Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        id="title" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Enter article title" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="cover" className="block mb-2 text-lg font-medium text-gray-900">Cover</label>
                    <input 
                        type="text" 
                        id="cover"
                        value={cover} 
                        onChange={e => setCover(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
                        placeholder="Enter article cover" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="category" className="block mb-2 text-lg font-medium text-gray-900">Category</label>
                    <select onChange={e => setCategory(e.target.value)} value={category} className="form-select block px-3 py-1.5 border border-solid border-gray-300">
                        {categories && categories.map((cat) => (
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="division" className="block mb-2 text-lg font-medium text-gray-900">Division</label>
                    <select onChange={e => setDivision(e.target.value)} value={division} className="form-select block px-3 py-1.5 border border-solid border-gray-300">
                        {divisions && divisions.map((cat) => (
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="body" className="block mb-2 text-lg font-medium text-gray-900">Body</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} type="text" rows="20" id="body" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter article body" required/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-gray-900">Status</label>
                    <select onChange={e => setStatus(e.target.value)} value={status} className="form-select block px-3 py-1.5 border border-solid border-gray-300">
                        <option value={0}>Pending</option>
                        <option value={1}>Published</option>
                        <option value={2}>Deleted</option>
                    </select>
                </div>
                <div className="mb-6 flex items-center">
                    <input checked={featured} onChange={e => setFeatured(e.target.checked)} type="checkbox" id="checkfeature" className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"/>
                    <label htmlFor="checkfeature" className="block text-lg text-gray-900">Featured</label>
                </div>
                <button onClick={submitData} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-10 py-2.5 mb-6">Submit</button>
            </form>
        </div>
    );
}

export default AddArticle;
