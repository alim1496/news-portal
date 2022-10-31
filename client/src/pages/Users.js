import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";

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

    const updateStaff = (id, staff) => {
        if(!confirm("Are you sure you want to update staff permission?")) return;
        fetch(`http://localhost:5000/api/v1/users/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` },
            body: JSON.stringify({ staff: staff === 1 ? 0 : 1 })
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
                        <th className="text-center p-4">Staff</th>
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
                            <td className="text-center p-4">{user.staff ? 'Yes' : 'No'}</td>
                            <td className="text-center p-4">{user.verified ? 'Yes' : 'No'}</td>
                            <td className="text-center p-4"><button type="button" onClick={() => updateStaff(user.id, user.staff)}>Update Staff</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
