import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import Auth from "../utils/auth";

var page = 1;

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [more, setMore] = useState(true);
    const limit = 10;

    useEffect(() => {
        page = 1;
        mainFetch(1);
    }, []);

    const fetchMore = () => {
        page++;
        mainFetch(page);
    };

    const mainFetch = (_page) => {
        fetch(`http://localhost:5000/api/v1/videos?page=${_page}&limit=${limit}`, {
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(({ data }) => {
            if(data.length < limit) {
                setMore(false);
            }
            setVideos(old => [...old, ...data]);
        });
    };

    const submitData = () => {
        if(title === "" || link === "") return;

        fetch("http://localhost:5000/api/v1/videos", {
            method: "POST",
            headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${Auth.getToken()}`},
            body: JSON.stringify({ title, link })
        })
        .then(res => res.json())
        .then(res => {
            setTitle("");
            setLink("");
            window.location.reload();
        });
    };

    const deleteData = (id) => {
        if(!window.confirm("Do you want to delete it?")) return;
        fetch(`http://localhost:5000/api/v1/videos/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${Auth.getToken()}` }
        })
        .then(res => res.json())
        .then(res => {
            setVideos(videos.filter(a => a.id !== id));
        });
    };

    return (
        <div className="container mx-auto my-10 px-8">
            <form>
                <label className="pr-4 font-medium" htmlFor="name">Title</label>
                <input
                    placeholder="Enter video title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 outline-none  focus:border-gray-400"
                />
                <label className="pl-8 pr-4 font-medium" htmlFor="name">Link</label>
                <input
                    placeholder="Enter video link"
                    type="url"
                    name="link"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    className="w-1/3 px-4 py-2 rounded-lg border border-gray-300 outline-none  focus:border-gray-400"
                />
                <button
                    onClick={submitData}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mx-6"
                >
                    Submit
                </button>
            </form>
            <div className="my-10">
                {videos && videos.map((video, index) => (
                    <div key={index} className="bg-white border border-gray-400 rounded px-4 py-4 mb-4">
                        <p>{video.title}</p>
                        <div className="flex">
                            <TimeAgo date={video.created} live={false} />
                            <a href={video.link} target="_blank" className="ml-4 text-blue-700">Go to Link</a>
                            <button type="button" className="ml-4 text-red-700 font-medium" onClick={() => deleteData(video.id)}>Delete</button>
                        </div>
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

export default Videos;
