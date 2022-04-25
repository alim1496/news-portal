import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/helper";

const RowFeed = ({ data, title }) => {
    return (
        <div className="mb-4 font-mono">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <div className="flex">
                {data && data.map((other, index) => (
                    <div key={index} className="mb-4 mr-4 border bg-gray-200 w-1/5">
                        <Link to={`/article/${other.id}/${slugify(other.title)}`}>
                            <img src={other.cover} alt="cover" />
                            <h4 className="p-2">{other.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RowFeed;
