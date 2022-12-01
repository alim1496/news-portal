import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";

const History = () => {
    const [histories, setHistories] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState(1);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("http://localhost:5000/api/v1/history", {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => {
            setHistories(res.data);
        });
    };

    const submitData = () => {
        if(title === "" || !date) return;

        fetch("http://localhost:5000/api/v1/history", {
            method: "POST",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` },
            body: JSON.stringify({ title, date })
        })
        .then(res => res.json())
        .then(res => {
            setTitle("");
            setDate("");
            fetchData();
        });
    };

    const updateHistory = (e, id) => {
        if(!e.target.checked) {
            alert("Once published, a history status cannot be changed.");
            return;
        }
        if(parseInt(localStorage.getItem("admin-role")) < 3) {
            alert("You are not allowed to do this.");
            return;
        }
        if(!confirm("Are you sure that you want to publish this history?")) return;
        fetch(`http://localhost:5000/api/v1/history/${id}`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => {
            fetchData();
        });
    };

    return (
        <div className="container mx-auto my-10 px-8">
            <form>
                <label className="pr-4 font-medium" htmlFor="name">Title</label>
                <input
                    placeholder="Enter history title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-1/2 px-4 py-2 rounded-lg border border-gray-300 outline-none  focus:border-gray-400"
                />
                <label className="px-4 font-medium" htmlFor="date">Date</label>
                <input
                    type="number"
                    name="date"
                    placeholder="Date"
                    min={1}
                    max={31}
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-24 px-4 py-2 rounded-lg border border-gray-300 outline-none  focus:border-gray-400"
                />
                <button
                    onClick={submitData}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-6"
                >
                    Submit
                </button>
            </form>
            <table className="mx-auto my-10 table-auto">
                <thead>
                    <tr>
                        <th className="text-center p-4">Date</th>
                        <th className="text-center p-4">Title</th>
                        <th className="text-center p-4">Published</th>
                        <th className="text-center p-4">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {histories && histories.map((history, index) => (
                        <tr>
                            <td className="text-center p-4">{history.date}</td>
                            <td className="p-4">{history.title}</td>
                            <td className="text-center p-4">
                                <input type="checkbox" checked={history.status === 1} onChange={(e)=>updateHistory(e, history.id)} />
                            </td>
                            <td className="text-center p-4">Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default History;
