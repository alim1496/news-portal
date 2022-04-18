import React, { useEffect, useState } from "react";

const AddArticle = () => {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [cover, setCover] = useState("");
    const [body, setBody] = useState("");
    const [category, setCategory] = useState(0);
    const [status, setStatus] = useState(0);
    const [featured, setFeatured] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/categories")
        .then(res => res.json())
        .then(res => setCategories(res.data));
    }, []);

    const submitData = () => {
        if(!title || !cover || !body) return;
        const data = {
            title, body, cover, featured: featured ? 1 : 0, status, category_id: category
        };
        fetch("http://localhost:5000/api/v1/articles", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            const { Error } = res;
            if(Error) {
                alert("Could not add article");
            } else {
                setCategory(0);
                setTitle("");
                setBody("");
                setCover("");
                setStatus(0);
                setFeatured(false);
                alert("Article added successfully")
            }
        });
    };

    return (
        <div className="container mx-auto my-10">
            <form>
                <div className="mb-6">
                    <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        id="title" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter article title" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="cover" className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Cover</label>
                    <input 
                        type="text" 
                        id="cover"
                        value={cover} 
                        onChange={e => setCover(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Enter article cover" 
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="category" className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Category</label>
                    <select onChange={e => setCategory(e.target.value)} className="form-select block px-3 py-1.5 border border-solid border-gray-300">
                        {categories && categories.map((cat) => (
                            <option value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-6">
                    <label htmlFor="body" className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Body</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} type="text" rows="20" id="body" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter article body" required/>
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Status</label>
                    <select onChange={e => setStatus(e.target.value)} className="form-select block px-3 py-1.5 border border-solid border-gray-300">
                        <option value={0}>Pending</option>
                        <option value={1}>Published</option>
                        <option value={2}>Deleted</option>
                    </select>
                </div>
                <div className="mb-6 flex items-center">
                    <input checked={featured} onChange={e => setFeatured(e.target.checked)} type="checkbox" id="checkfeature" className="bg-gray-50 mr-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    <label htmlFor="checkfeature" className="block text-lg text-gray-900 dark:text-gray-300">Featured</label>
                </div>
                <button onClick={submitData} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mb-6">Submit</button>
            </form>
        </div>
    );
}

export default AddArticle;
