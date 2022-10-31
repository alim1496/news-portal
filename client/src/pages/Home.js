import React, { useState, useEffect } from "react";
import Carousel from "react-simply-carousel";
import DoubleRowFeed from "../components/DoubleRowFeed";
import Footer from "../components/Footer";
import RowFeed from "../components/RowFeed";
import SingleFeed from "../components/SingleFeed";

var i = 0;

const Home = () => {
    const [national, setNational] = useState([]);
    const [inter, setInter] = useState([]);
    const [pol, setPol] = useState([]);
    const [eco, setEco] = useState([]);
    const [enter, setEnter] = useState([]);
    const [tech, setTech] = useState([]);
    const [sport, setSport] = useState([]);
    const [life, setLife] = useState([]);
    const [top, setTop] = useState([]);
    const [latest, setLatest] = useState([]);
    const [curIndex, setCurIndex] = useState(0);
    const [day, setDay] = useState([]);
    
    useEffect(() => {
        const topInterval = setInterval(() => {
            document.querySelector(`#dot-${i}`).style.fontWeight = '800';
            i++;
            if(i === 5) {
                i = 0;
                document.querySelector('#dot-0').style.fontWeight = '500';
                document.querySelector('#dot-1').style.fontWeight = '500';
                document.querySelector('#dot-2').style.fontWeight = '500';
                document.querySelector('#dot-3').style.fontWeight = '500';
                document.querySelector('#dot-4').style.fontWeight = '500';
            }
        }, 4000);

        fetch("http://localhost:5000/api/v1/articles/home/feed")
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
            setTop(res.data[8]);
            setLatest(res.data[9]);
            setDay(res.data[10]);
        });

        return () => clearInterval(topInterval);
    }, []);

    return (
        <div className="container mx-auto px-8">
            <div className="flex my-12">
                {latest.length > 0 && (
                    <div className="w-1/3 mr-4">
                        {latest && latest.map((lat, index) => (
                            <div key={index} className="border bg-white p-4 mb-1 font-mono">
                                <h3>{lat.title}</h3>
                            </div>
                        ))}
                    </div>
                )}
                <div className="w-500">
                    {top.length > 0 && (
                        <>
                            <Carousel
                                activeSlideIndex={curIndex}
                                onRequestChange={(_new) => setCurIndex(_new)}
                                itemsToShow={1}
                                itemsToScroll={1}
                                autoplay={true}
                                delay={3000}
                            >
                                {top && top.map((_top, index) => (
                                    <div key={index} style={{ width: 500, height: 300 }} className="relative border-2 border-black">
                                        <img src={_top.cover} style={{ width: 500, height: 295 }} alt="cover" />
                                        <div className="absolute w-full p-2 bottom-0 bg-gray-500 text-white text-center">
                                            <h3 className="font-mojo">{_top.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </Carousel>
                            <div className="my-2 text-center">
                                <span id="dot-0" className="mr-2 font-medium">.</span>
                                <span id="dot-1" className="mr-2 font-medium">.</span>
                                <span id="dot-2" className="mr-2 font-medium">.</span>
                                <span id="dot-3" className="mr-2 font-medium">.</span>
                                <span id="dot-4" className="mr-2 font-medium">.</span>
                            </div>
                        </>
                    )}
                </div>
                <div className="ml-4 font-mono">
                    {day.length > 0 && (
                    <>
                        <h3 className="font-semibold mb-2">ইতিহাসের পাতায় আজ</h3>
                        <ul className="list-disc">
                            {day && day.map((_day, index) => (
                                <li key={index} className="max-w-sm mb-2 ml-4">{_day.title}</li>
                            ))}
                        </ul>
                    </>)}
                </div>
            </div>
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
            <Footer />
        </div>
    );
};

export default Home;
