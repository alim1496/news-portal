import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/helper";

const SingleFeed = ({ data, title, width, font }) => {
    return (
        <div className={`${width} mr-4 mb-4 font-mono`}>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            {data && data.map((other, index) => (
                <Link to={`/article/${other.id}/${slugify(other.title)}`}>
                    <div key={index} className="flex mb-4 border bg-white">
                        <img src={other.cover} alt="cover" className="w-1/2" />
                        <h4 className={`w-1/2 p-4 ${font}`}>{other.title}</h4>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SingleFeed;
