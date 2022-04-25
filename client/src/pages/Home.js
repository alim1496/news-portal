import React, { useState, useEffect } from "react";
import DoubleRowFeed from "../components/DoubleRowFeed";
import RowFeed from "../components/RowFeed";
import SingleFeed from "../components/SingleFeed";

const Home = () => {
    const [national, setNational] = useState([]);
    const [inter, setInter] = useState([]);
    const [pol, setPol] = useState([]);
    const [eco, setEco] = useState([]);
    const [enter, setEnter] = useState([]);
    const [tech, setTech] = useState([]);
    const [sport, setSport] = useState([]);
    const [life, setLife] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/articles/feed")
        .then(res => res.json())
        .then(res => {
            setNational(res.data[0]);
            setInter(res.data[1]);
            setPol(res.data[2]);
            setEco(res.data[3]);
            setEnter(res.data[4]);
            setTech(res.data[5]);
            setSport(res.data[6]);
            setLife(res.data[7]);
        });
    }, []);

    return (
        <div className="container mx-auto">
            <div className="flex">
                {national.length > 0 && <SingleFeed data={national} title="জাতীয়" width="w-1/3" font="text-base" />}
                {inter.length > 0 && <SingleFeed data={inter} title="আন্তর্জাতিক" width="w-1/3" font="text-base" />}
                {pol.length > 0 && <SingleFeed data={pol} title="রাজনীতি" width="w-1/3" font="text-base" />}
            </div>
            {eco.length > 0 && <RowFeed data={eco} title="অর্থনীতি" />}
            {enter.length > 0 && <DoubleRowFeed data={enter} title="বিনোদন" />}
            {tech.length > 0 && <RowFeed data={tech} title="প্রযুক্তি" />}
            <div className="flex">
                {sport.length > 0 && <SingleFeed data={sport} title="খেলাধুলা" width="w-1/2" font="text-2xl" />}
                {life.length > 0 && <SingleFeed data={life} title="লাইফস্টাইল" width="w-1/2" font="text-2xl" />}
            </div>
        </div>
    );
};

export default Home;
