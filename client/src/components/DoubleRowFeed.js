import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/helper";

const DoubleRowFeed = ({ data, title }) => {
    const first = [data[0], data[1]];
    const second = [data[2], data[3], data[4]];

    return (
        <div className="mb-4 font-mono">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <div className="flex">
                {first && first.map((other, index) => (
                    <div key={index} className="mb-4 mr-4 border bg-gray-200 w-1/2">
                        <Link to={`/article/${other.id}/${slugify(other.title)}`}>
                            <img src={other.cover} alt="cover" />
                            <h4 className="p-4 text-2xl">{other.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="flex">
                {second && second.map((other, index) => (
                    <div key={index} className="mb-4 mr-4 border bg-gray-200 w-1/3">
                        <Link to={`/article/${other.id}/${slugify(other.title)}`}>
                            <img src={other.cover} alt="cover" />
                            <h4 className="p-4 text-2xl">{other.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoubleRowFeed;
