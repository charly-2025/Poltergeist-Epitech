import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Support = ({localization}) => {
    return (
        <div className="Support-container">
            <Header localization={localization} />
            <div className="Support-content">
                <h2>Need Help? Contact Our Support Team!</h2>
            </div>
            <Footer />
        </div>
    );
}

export default Support;