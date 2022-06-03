import React, { useContext, useState } from "react";
import { UserContext } from "../App";

const UserLogin = () => {
    const { open, updateModal, verify, updateVerify } = useContext(UserContext);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repass, setRepass] = useState("");
    const [email1, setEmail1] = useState("");
    const [phone, setPhone] = useState("");
    const [nid, setNid] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState(0);
    const [address, setAddress] = useState("");
    const [password1, setPassword1] = useState("");

    const register = () => {
        if(!fullname || !email || !password || !repass) return;
        if(password !== repass) return;

        fetch("http://localhost:5000/api/v1/users/register", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ fullname, email, password, phone, nid, gender, address, dob: new Date(dob).toISOString().slice(0, 10) })
        })
        .then(res => res.json())
        .then(({ message, code, Error }) => {
            if(message) {
                alert(message);
                if(code) {
                    localStorage.setItem("code", code);
                    localStorage.setItem("email", email);
                }
                setFullname("");
                setEmail("");
                setPassword("");
                setRepass("");
                setNid("");
                setPhone("");
                setAddress("");
                setGender(0);
                setDob("");
                updateModal(false);
                updateVerify(true);
            } else {
                if(Error.errno === 1062) {
                    alert("Email already exists");
                } else {
                    alert("Could not register user");
                }
            }
        });
    };

    const login = () => {
        if(!email1 || !password1) return;

        fetch("http://localhost:5000/api/v1/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email: email1, password: password1, admin: false })
        })
        .then(res => res.json())
        .then(({ message, Error, token, data }) => {
            if(message) {
                alert(message);
                setEmail1("");
                setPassword1("");
                window.user = data;
                localStorage.setItem("user-token", token);
                updateModal(false);
            } else {
                alert(Error);
            }
        });
    };

    if(open) {
        return (
            <div id="login-modal" className="flex font-mono justify-evenly border rounded-lg bg-blue-100 shadow-xl p-10 inset-0 max-w-4xl m-auto h-fit fixed z-50 outline-none focus:outline-none">
                <span className="font-bold absolute right-5 top-5 hover:cursor-pointer" onClick={() => updateModal(false)}>X</span>
                <div className="w-1/2 mr-10">
                    <h3 className="mb-2 font-semibold text-lg">Already having an account</h3>
                    <div className="mb-2">
                        <input type="email" placeholder="Email Address" className="w-full py-1 px-2" value={email1} onChange={e => setEmail1(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="password" placeholder="Password" className="w-full py-1 px-2" value={password1} onChange={e => setPassword1(e.target.value)} />
                    </div>
                    <button type="button" className="border bg-blue-700 text-white px-10 py-2 hover:bg-blue-800" onClick={login}>Login</button>
                </div>
                <div className="w-1/2">
                    <h3 className="mb-2 font-semibold text-lg">Don't have an account</h3>
                    <div className="mb-2">
                        <input type="text" placeholder="Full Name" className="w-full py-1 px-2" value={fullname} onChange={e => setFullname(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="email" placeholder="Email Address" className="w-full py-1 px-2" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="tel" placeholder="Mobile Number" className="w-full py-1 px-2" value={phone} onChange={e => setPhone(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="NID" className="w-full py-1 px-2" value={nid} onChange={e => setNid(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Address" className="w-full py-1 px-2" value={address} onChange={e => setAddress(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="text" placeholder="Date of Birth YYYY-MM-DD" className="w-full py-1 px-2" value={dob} onChange={e => setDob(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="password" placeholder="Password" className="w-full py-1 px-2" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input type="password" placeholder="Retype Password" className="w-full py-1 px-2" value={repass} onChange={e => setRepass(e.target.value)} />
                    </div>
                    <div className="mb-2">
                        <input className="mr-1" type="radio" id="male" name="gender" value={1} onChange={() => setGender(1)} />
                        <label className="mr-4" htmlFor="male">Male</label>
                        <input className="mr-1" type="radio" id="female" name="gender" value={2} onChange={() => setGender(2)} />
                        <label className="mr-2" htmlFor="female">Female</label>
                    </div>
                    <button type="button" className="border bg-blue-700 text-white px-10 py-2 hover:bg-blue-800" onClick={register}>Register</button>
                </div>
            </div>
        );
    }
};

export default UserLogin;
