import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Feedback = () => {
    return (
        <div className="Feedback-container">
            <Header />
            <div className="Feedback-content">
                <h2>We value your feedback!</h2>
            </div>
            <Footer />
        </div>
    );
}

export default Feedback;