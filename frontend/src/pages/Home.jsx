import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Post from "../components/Post.jsx";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDisclosure, Button } from "@heroui/react";
import CreatePopUp from "../components/CreatePopUp.jsx";



import "./Home.css";

import SearchLoop from "../images/search.png";
import CloseCross from "../images/close.png";



export function Home  ({ localization}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const [activeTheme, setActiveTheme] = useState("recents");
    const [listPosts, setListPosts] = useState([]);  
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    
        useEffect(() => {
        const checkAuth = async () => {
          const res = await fetch("http://localhost:3000/check", {
            method:"POST",
            credentials: "include"
          });
    
          if (!res.ok) {
            navigate("/");
          }
        };
    
        checkAuth();
      }, []);



    useEffect(() => {
        const fetchPosts = async () => {
        const res = await fetch(
        `http://localhost:3000/getThreads?type=${activeTheme}&search=${searchQuery}`,
        {
          method: "GET",
          credentials: "include"
        }
      );
        if (!res.ok){
            console.error("erreur http :", res.status);
            return;
        }
        const data = await res.json();
        console.log(data)
        setListPosts(data);
        };

        fetchPosts();
    }, [activeTheme,searchQuery]);

    const addNewPost = (New) => {
        setListPosts([New, ...listPosts]);
        
    };
    return (
        <div className="Home-page">
            <Header localization={localization} />
            <div className="Home-content">
                <div className="Home-wrapper">
               <div className="Theme-buttons">
                    <button className={activeTheme === "recents" ? "Theme-active" : ""} onClick={() => setActiveTheme("recents")}>Recent</button>
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
                    <Post title={post.thread_title} content={post.thread_content} country={post.thread_country} city={post.thread_city} listLike={post.thread_likes} listCom={post.thread_replies} createdDate={post.createdAt}/>))}
                </div>}

                <Button
                    onPress={onOpen}
                    className="create-thread-btn"
                >
                    + Create thread
                </Button>

                <CreatePopUp
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="right"
                    size="sm"
                    backdrop="opaque"
                    hideCloseButton
                    />

                </div>
            </div>
            

            <Footer/>
        </div>
    );
}


export default Home;