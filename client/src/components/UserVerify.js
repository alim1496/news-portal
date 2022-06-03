import React, { useContext, useState } from "react";
import { UserContext } from "../App";

const UserVerify = () => {
    const { verify, updateVerify } = useContext(UserContext);
    const [code, setCode] = useState("");

    const verifyUser = () => {
        const _code = localStorage.getItem("code");
        console.log(typeof code);
        console.log(typeof _code);
        if(code === _code) {
            fetch(`http://localhost:5000/api/v1/users/${localStorage.getItem("email")}`)
            .then(res => res.json())
            .then(() => {
                localStorage.removeItem("code");
                localStorage.removeItem("email");
                setCode("");
                updateVerify(false);
                alert("User verified successfully");
            })
            .catch(err => console.log(err));
        } else {
            alert("Wrong input provided");
        }
    };

    if(verify) {
        return (
            <div className="text-center font-mono border rounded-lg bg-blue-100 shadow-xl p-10 inset-0 max-w-lg m-auto h-fit fixed z-50 outline-none focus:outline-none">
                <p>Your account has been registered successfully. A 6 digit code has been sent to your registered email address. Please enter the code below to verify your account.</p>
                <div className="my-4">
                    <input type="text" placeholder="6 digit code" className="w-3/4 py-1 px-2" value={code} onChange={e => setCode(e.target.value)} />
                </div>
                <button type="button" className="border bg-blue-700 text-white px-10 py-2 hover:bg-blue-800" onClick={verifyUser}>Submit</button>
            </div>
        );
    }
};

export default UserVerify;
