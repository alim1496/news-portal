import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        document.querySelector("#menu-bar").style.display = 'none';
        return () => {
            document.querySelector("#menu-bar").style.display = 'block';
        };
    }, []);

    const doLogin = () => {
        if(!email || !password) return;
        
        fetch("http://localhost:5000/api/v1/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password, admin: true })
        })
        .then(res => res.json())
        .then(res => {
            const { Error, data, token } = res;
            if(!Error) {
                Auth.authenticateUser(token);
                window.location = "/admin";
                localStorage.setItem("admin-id", parseInt(data.id)); 
            } else {
                alert(Error);
            }
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-10 py-10 bg-white shadow-lg rounded-lg w-1/4">
                <h1 className="font-medium text-xl text-center mb-6">Login to Admin Panel</h1>
                <form>
                    <input type="text" onChange={e => setEmail(e.target.value)} value={email} placeholder="Email" className="border bg-gray-200 rounded-lg block mb-4 px-2 py-2 w-full" />
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Password" className="border bg-gray-200 rounded-lg block mb-4 px-2 py-2 w-full" />
                    <button type="button" onClick={doLogin} className="bg-blue-700 hover:bg-blue-800 text-white text-lg w-full py-2 rounded-lg font-medium">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
