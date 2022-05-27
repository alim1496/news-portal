import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("http://localhost:5000/api/v1/categories", {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => setCategories(res.data));
    };

    const deleteCategory = (id) => {
        if(!window.confirm("Do you want to delete it?")) return;
        fetch(`http://localhost:5000/api/v1/categories/${id}`, {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` },
            method: "DELETE"
        })
        .then(res => res.json())
        .then(({ message, Error }) => {
            if(Error) alert(Error);
            else {
                alert(message);
                setCategories([]);
                fetchData();
            }
        });
    };

    const submitData = () => {
        if(category === "") return;

        fetch("http://localhost:5000/api/v1/categories", {
            method: "POST",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` },
            body: JSON.stringify({ name: category })
        })
        .then(res => res.json())
        .then(res => {
            setCategory("");
            fetchData();
        });
    };

    return (
        <div className="container mx-auto my-10">
            <form>
                <label className="pr-4 font-medium" htmlFor="name">Name</label>
                <input
                    placeholder="Enter category name"
                    type="text"
                    name="name"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 outline-none  focus:border-gray-400"
                />
                <button
                    onClick={submitData}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-6"
                >
                    Submit
                </button>
            </form>
            <div className="my-10 flex flex-wrap">
                {categories && categories.map((cat, index) => (
                    <div key={index} className="flex bg-white border border-gray-400 rounded px-4 py-2 mr-4 mb-4 font-medium">
                        <p className="mr-4">{cat.name}</p>
                        <p className="hover:cursor-pointer hover:opacity-70" onClick={() => deleteCategory(cat.id)}>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;
