import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Favorite = ({localization}) => {
    return (
        <div className="Favorite-page">
            <Header localization={localization} />
            <div className="Favorite-content">
                <h1>Favorite Page</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Favorite;