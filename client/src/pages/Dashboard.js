import React, { useEffect, useState } from "react";
import Auth from "../utils/auth";

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/articles/dashboard", {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => {
            setData(res.data);
        });
    }, []);

    return (
        <div className="container mx-auto">
            {/* Your token is {Auth.getToken()} */}
            {data.length > 0 && (
                <div className="flex flex-wrap my-10 font-mono">
                    {data && data.map((_data, index) => (
                        <div key={index} className="border mr-2 mb-2 p-4 rounded-lg">
                            <h3 className="text-lg">{Object.keys(_data[0])}</h3>
                            <h3 className="text-lg">{Object.values(_data[0])}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
