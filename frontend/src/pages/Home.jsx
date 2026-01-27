import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Post from "../components/Post.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



import "./Home.css";

import SearchLoop from "../images/search.png";
import CloseCross from "../images/close.png";


const Home = ({ localization}) => {
    const [activeTheme, setActiveTheme] = useState("recent");
    const [listPosts, setListPosts] = useState([]);  
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        /*fetch(`http://localhost:5000/posts?theme=${activeTheme}&search=${searchQuery}`)*/
    }, [activeTheme,searchQuery]);

    const addNewPost = (New) => {
        setListPosts([New, ...listPosts]);}

    return (
        <div className="Home-page">
            <Header localization={localization} />
            <div className="Home-content">
                <div className="Home-wrapper">
               <div className="Theme-buttons">
                    <button className={activeTheme === "recent" ? "Theme-active" : ""} onClick={() => setActiveTheme("recent")}>Recent</button>
                    <button className={activeTheme === "proximity" ? "Theme-active" : ""} onClick={() => setActiveTheme("proximity")}>Proximity</button>
                </div>
                <div className="Search-bar">
                    <img src={SearchLoop} alt="Search" />
                    <input 
                        type="text" 
                        placeholder="Search posts..." 
                        value={searchQuery} 
                        onChange={(e) => setSearchQuery(e.target.value)} 
                    />
                    {searchQuery ? (
                        <img src={CloseCross} alt="Close" onClick={() => setSearchQuery("")} />
                    ) : ""}
                </div>

                {localization===null && activeTheme === "proximity" ? <div className="AlertNoLoc">
                    <p>Please set your localization to view posts by proximity.</p>
                    <Link to="/localization">Go to Localization Page</Link>
                </div>
                : <div className="Posts-container">
                    {listPosts.map(post => (
                    <Post /*ici rajouter donner de chaque post ex: id=post.id*//>))}
                </div>}

                </div>
            </div>
            <Footer />
        </div>
    );
};


export default Home;