import React from "react";
import Auth from "../utils/auth";

const Dashboard = () => {
    return (
        <div className="container mx-auto">
            Your token is {Auth.getToken()}
        </div>
    );
}

export default Dashboard;
