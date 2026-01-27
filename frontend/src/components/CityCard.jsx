import React, { useEffect, useState } from "react";
import LocalizationLogo from "../images/location.png";
import "./CityCard.css";

const CityCard = ({localization,setLocalization,city}/*variable comme city name, country+listedesPost pour mettre a jour le nb de thread*/) => {
    const [nbThread,setNbThread] = useState(0);

    useEffect(() => {/*Fetch le nombre de thread par ville*/}, [/*liste post*/]);

    const handleCityCard = () =>{
        setLocalization(city);
    };

    return(
        <div onClick={handleCityCard} className={localization?.name === city.name ? "CityCard-container-select":"CityCard-container"}>
            <div className="CityCard-Name">
                <img src={LocalizationLogo} alt="LocLogo"/>
                <h2>{city.name}</h2>
            </div>
            <div className="CityCard-Country">{city.country}</div>
            <div className="CityCard-nbThread">
                <p>.</p>
                <div>{nbThread} threads</div>
            </div>
        </div>
    );
}

export default CityCard;