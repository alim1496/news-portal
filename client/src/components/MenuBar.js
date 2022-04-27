import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/categories/feed")
        .then(res => res.json())
        .then(res => setCategories(res.data));
    }, []);

    return (
        <div id="menu-bar" className="bg-white text-center py-2">
            <h1 className="font-bold font-mono text-3xl">
                <Link to="/">আজকের খবর</Link>
            </h1>
            <hr className="my-2" />
            <div className="flex justify-center">
                <>
                    <span className="mr-4">
                        <Link className="font-medium font-mono hover:text-blue-700" to="/latest">সর্বশেষ</Link>
                    </span>
                    {categories && categories.map((cat, index) => (
                        <span className="mr-4" key={index}>
                            <Link className="font-medium font-mono hover:text-blue-700" to={`/category/${cat.id}/${cat.name}`}>{cat.name}</Link>
                        </span>
                    ))}
                    <span className="mr-4">
                        <Link className="font-medium font-mono hover:text-blue-700" to="/videos">ভিডিও</Link>
                    </span>
                </>
            </div>
            <hr className="my-2" />
        </div>
    );
};

export default MenuBar;
