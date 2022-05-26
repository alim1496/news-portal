import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { parseToday } from "../utils/helper";
import { UserContext } from "../App";

const MenuBar = () => {
    const [categories, setCategories] = useState([]);
    const { updateModal } = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/categories/feed")
        .then(res => res.json())
        .then(res => setCategories(res.data));
    }, []);

    const logout = () => {
        window.localStorage.removeItem("user-token");
        window.user = null;
        window.location.reload();
    };

    return (
        <div id="menu-bar" className="container mx-auto bg-white text-center py-2 bg-blue-50">
            <div className="flex justify-between items-center">
                <span>{parseToday()}</span>
                <h1 className="font-bold font-mono text-3xl py-2">
                    <Link to="/">আজকের খবর</Link>
                </h1>
                {!window.user ? (
                    <span className="text-blue-500 font-mono cursor-pointer hover:text-blue-800" onClick={() => updateModal(true)}>
                        লগইন
                    </span>
                    )
                    : (
                        <div className="flex font-mono">
                            <span className="mr-4">{window.user.name}</span>
                            <span className="text-blue-500 cursor-pointer hover:text-blue-800" onClick={logout}>
                                লগআউট
                            </span>
                        </div>    
                )}
                
            </div>
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
