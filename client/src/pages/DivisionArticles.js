import React, { useState, useEffect } from "react";
import RowFeed from "../components/RowFeed";

const DivisionArticles = () => {
    const [news, setNews] = useState([]);
    const divisions = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/articles/home/divisions")
        .then(res => res.json())
        .then(({ data }) => {
            setNews(data);
        });
    }, []);

    return (
        <div className="container mx-auto">
            {news && news.map((part, index) => (
                <RowFeed 
                    data={part} 
                    title={divisions[index]} 
                    _style={{ height: 205 }} 
                    containerStyle="flex-wrap justify-center" 
                    titleStyle="text-center" 
                />
            ))}
        </div>
    );
};

export default DivisionArticles;
