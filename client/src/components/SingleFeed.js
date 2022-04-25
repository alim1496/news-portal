import React from "react";

const SingleFeed = ({ data, title }) => {
    console.log(data);
    const hero = data[0];
    const others = data;
    // others.splice(0, 1);
    console.log(data);
    return (
        <div className="w-1/2">
            <div>
                <h3>{title}</h3>
            </div>
            <div className="flex">
                <div className="w-1/2">
                    <img src={hero.cover} alt="cover" />
                    <h4>{hero.title}</h4>
                </div>
                <div className="w-1/2">
                    {others && others.map((other, index) => (
                        <div key={index} className="flex">
                            <img src={other.cover} alt="cover" className="w-1/2" />
                            <h4 className="w-1/2">{other.title}</h4>
                        </div>
                    ))}
                </div>
            </div>         
        </div>
    );
};

export default SingleFeed;
