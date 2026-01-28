import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";

const Feedback = ({localization}) => {
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



    return (
        <div className="Feedback-container">
            <Header localization={localization} />
            <div className="Feedback-content">
                <h2>We value your feedback!</h2>
            </div>
            <Footer />
        </div>
    );
}

export default Feedback;