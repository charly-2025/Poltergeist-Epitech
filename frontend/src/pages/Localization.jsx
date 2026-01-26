import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Localization = ({ localization, setLocalization }) => {
    return (
        <div className="Localization-page">
            <Header />
            <div className="Localization-content">
                <h1>Localization Page</h1>
            </div>
            <Footer />
        </div>
    );
}; 

export default Localization;