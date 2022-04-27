import React, { useEffect, useState } from "react";

var page = 1;

const HomeVideos = () => {
    const [videos, setVideos] = useState([]);
    const [more, setMore] = useState(true);
    const limit = 10;

    useEffect(() => {
        page = 1;
        setVideos([]);
        fetchData(page);
    }, []);

    const fetchMore = () => {
        page++;
        fetchData(page);
    };

    const fetchData = (_page) => {
        fetch(`http://localhost:5000/api/v1/videos/feed?page=${_page}&limit=${limit}`)
        .then(res => res.json())
        .then(({ data }) => {
            if(data.length < limit) {
                setMore(false);
            }
            setVideos(old => [...old, ...data]);
        });
    };

    return (
        <div className="container mx-auto">
            <h2 className="my-2 font-bold text-lg text-center">ভিডিও</h2>
            <div className="flex flex-wrap justify-center mb-8">
                {videos && videos.map((video, index) => (
                    <div key={index} className="border w-1/3 h-96 mr-4 mb-4 bg-gray-200">
                        <iframe src={video.link} title={video.title} width="100%" height="85%" frameborder="0"></iframe>
                        <h4 className="p-2 font-mojo font-semibold">{video.title}</h4>
                    </div>
                ))}
            </div>
            {more && (
                <div className="text-center">
                    <button type="button" className="border px-8 py-2 mb-8" onClick={fetchMore}>আরও লোড করুন</button>
                </div>
            )}
        </div>
    );
};

export default HomeVideos;
