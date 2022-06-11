import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../utils/helper";

const RowFeed = ({ data, title, _style, containerStyle, titleStyle }) => {
    return (
        <div className="mb-4 font-mono">
            <h3 className={`text-lg font-semibold mb-2 ${titleStyle}`}>{title}</h3>
            <div className={`flex ${containerStyle}`}>
                {data && data.map((other, index) => (
                    <div key={index} className="mb-4 mr-4 border bg-white w-1/5">
                        <Link to={`/article/${other.id}/${slugify(other.title)}`}>
                            <img src={other.cover} alt="cover" style={_style} />
                            <h4 className="p-2">{other.title}</h4>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RowFeed;
