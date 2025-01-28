import React, { useEffect, useState } from "react";
import Loader from "react-loaders";
import AnimatedLetters from "../AnimatedLetters";
import "./index.scss";
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';

const Portfolio = () => { 
    const [letterClass, setLetterClass] = useState('text-animate');
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover');
        }, 3000);

        // Cleanup to clear the timer on component unmount
        return () => {
            clearTimeout(timer);
        };
    }, []); // Empty dependency array ensures this effect runs only once

    useEffect(() => {
        getPortfolio();
    }, []); // Empty dependency array ensures this effect runs only once

    const getPortfolio = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'portfolio'));
            setPortfolio(querySnapshot.docs.map((doc) => doc.data()));
            setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
            console.error("Error fetching portfolio data: ", error);
            setLoading(false); // Set loading to false even if there is an error
        }
    }

    const renderPortfolio = (portfolio) => {
        return (
            <div className="images-container">
                {portfolio.map((port, idx) => (
                    <div className="image-box" key={idx}>
                        <img 
                            src={port.cover || "/default-image.png"}  // Fallback if cover image is missing
                            className="portfolio-image"
                            alt={port.title || "Portfolio Item"}  // Fallback title if missing
                        />
                        <div className="content">
                            <p className="title">{port.title || "Untitled"}</p>  {/* Fallback title */}
                            <h4 className="description">{port.description || "No description available."}</h4>  {/* Fallback description */}
                            <button
                                className="btn"
                                onClick={() => window.open(port.url || "#")}  // Fallback URL
                            >View</button>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="container portfolio-page">
            <h1 className="page-title">
                <AnimatedLetters
                    letterClass={letterClass}
                    strArray={"Portfolio".split("")}
                    idx={15}
                />
            </h1>
            {/* Conditional rendering based on loading */}
            {loading ? <Loader type="pacman" /> : renderPortfolio(portfolio)}
        </div>
    );
};

export default Portfolio;
