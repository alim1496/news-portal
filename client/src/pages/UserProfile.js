import React, { useState, useEffect } from "react";


const UserProfile = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [current, setCurrent] = useState("");
    const [retype, setRetype] = useState("");
    const [newPass, setNewPass] = useState("");
    const { id } = window.user;

    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/users/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("user-token")}` }
        })
        .then(res => res.json())
        .then(({ data }) => {
            const { email, mobile, dob, nid, fullname, address: _address } = data;
            setName(fullname);
            setAddress(_address);
            localStorage.setItem("email", email);
            localStorage.setItem("mobile", mobile);
            localStorage.setItem("dob", dob.split("T")[0]);
            localStorage.setItem("nid", nid);
        });
    }, []);

    const submitData = () => {
        if(current !== "" && retype !== "" && newPass !== "") {
            if(retype !== newPass) {
                alert("Passwords did not match");
                return;
            }
            fetch(`http://localhost:5000/api/v1/users/${id}/self`, {
                method: "POST",
                headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${localStorage.getItem("user-token")}`},
                body: JSON.stringify({ password: newPass, fullname: name, address })
            })
            .then(res => res.json())
            .then(({ data }) => {
                alert("Data updated successfully.");
            });
        }
    };

    return (
        <div className="container mx-auto max-w-3xl px-4">
            <h3 className="text-2xl font-semibold mb-4">User Profile</h3>
            <table>
                <tbody>
                    <tr>
                        <td><label className="font-semibold">Full Name</label></td>
                        <td><input type="text" value={name} className="px-2 py-1 round w-96" onChange={(e)=>setName(e.target.value)} /></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold">Email</label></td>
                        <td><input type="text" value={localStorage.getItem("email")} className="px-2 py-1 round w-96" readOnly /></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold">Mobile</label></td>
                        <td><input type="text" value={localStorage.getItem("mobile")} className="px-2 py-1 round w-96" readOnly /></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold pr-4">DOB</label></td>
                        <td><input type="text" value={localStorage.getItem("dob")} className="px-2 py-1 round w-96" readOnly /></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold pr-4">NID</label></td>
                        <td><input type="text" value={localStorage.getItem("nid")} className="px-2 py-1 round w-96" readOnly /></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold pr-4">Address</label></td>
                        <td><textarea rows={5} className="px-2 py-1 round w-96" value={address} onChange={(e)=>setAddress(e.target.value)} /></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold pr-4">Password</label></td>
                        <td><input type="password" className="px-2 py-1 round w-96" value={current} onChange={(e)=>setCurrent(e.target.value)} placeholder="Type current password"/></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold pr-4">Password</label></td>
                        <td><input type="password" className="px-2 py-1 round w-96" value={newPass} onChange={(e)=>setNewPass(e.target.value)} placeholder="Type new password"/></td>
                    </tr>
                    <br />
                    <tr>
                        <td><label className="font-semibold pr-4">Password</label></td>
                        <td><input type="password" className="px-2 py-1 round w-96" value={retype} onChange={(e)=>setRetype(e.target.value)}  placeholder="Retype new password"/></td>
                    </tr>
                    <br />
                    <tr>
                        <td>
                            <button type="button" onClick={submitData} className="my-2 bg-blue-700 text-white py-2 px-8 text-sm hover:bg-blue-800">
                                Update
                            </button>
                        </td>
                    </tr>
                    <br />
                </tbody>
            </table>
        </div>
    );
};

export default UserProfile;
