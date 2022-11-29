import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { roles } from "../utils/helper";

var page = 1;

const Users = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        mainFetch();
    }, []);

    const mainFetch = () => {
        fetch(`http://localhost:5000/api/v1/users`, {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(({ data }) => {
            setUsers(data);
        });
    };

    const updateVerified = (e, id) => {
        if(!e.target.checked) {
            alert("Once a user is verified, it cannot be changed.");
        } else {
            if(!confirm("Are you sure you want to verify the user?")) return;
            fetch(`http://localhost:5000/api/v1/users/verify/${id}`, {
                method: "PATCH",
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` }
            })
            .then(res => res.json())
            .then(res => {
                setUsers([]);
                mainFetch();
            });
        }
    };

    const updateRole = (e, id, verified) => {
        if(!verified) {
            alert("In order to change the role, the user must be verified.");
            return;
        }
        if(!confirm("Are you sure you want to update this role?")) return;
        fetch(`http://localhost:5000/api/v1/users/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` },
            body: JSON.stringify({ role: e.target.value })
        })
        .then(res => res.json())
        .then(res => {
            setUsers([]);
            mainFetch();
        });
    }

    return (
        <div className="container mx-auto px-8">
            <table className="mx-auto my-10 table-auto">
                <thead>
                    <tr>
                        <th className="text-center p-4">Name</th>
                        <th className="text-center p-4">Email</th>
                        <th className="text-center p-4">Mobile</th>
                        <th className="text-center p-4">Role</th>
                        <th className="text-center p-4">Verified</th>
                        <th className="text-center p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user, index) => (
                        <tr key={index}>
                            <td className="text-center p-4">{user.fullname}</td>
                            <td className="text-center p-4">{user.email}</td>
                            <td className="text-center p-4">{user.mobile}</td>
                            <td className="text-center p-4">{roles[user.role]}</td>
                            <td className="text-center p-4">
                                <input type="checkbox" checked={user.verified} onChange={(e)=>updateVerified(e, user.id)} />
                            </td>
                            <td className="text-center p-4">
                                <select onChange={(e)=>updateRole(e, user.id, user.verified)}>
                                    <option value="" selected disabled hidden>Choose Role</option>
                                    <option value={1}>User</option>
                                    <option value={2}>Author</option>
                                    <option value={3}>Editor</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
