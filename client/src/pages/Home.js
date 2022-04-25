import React, { useState, useEffect } from "react";
import SingleFeed from "../components/SingleFeed";

const Home = () => {
    const [articles, setArticles] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/articles/feed")
        .then(res => res.json())
        .then(res => {
            setArticles(res.data);
        });
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex">
                <SingleFeed data={articles[0]} title="জাতীয়" />
                <SingleFeed data={articles[1]} title="আন্তর্জাতিক" />
            </div>
        </div>
    );
};

export default Home;
