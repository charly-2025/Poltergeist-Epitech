import React, { useEffect, useState } from "react";
import LocalizationLogo from "../images/location.png";
import "./CityCard.css";

const CityCard = ({localization,setLocalization,city}) => {
    const [nbThread,setNbThread] = useState(0);

    useEffect(() => {/*Fetch le nombre de thread par ville*/}, [/*liste post*/]);

    const handleCityCard = () =>{
        setLocalization(city);
    };

    return(
        <div onClick={handleCityCard} className={localization?.city === city.city ? "CityCard-container-select":"CityCard-container"}>
            <div className="CityCard-Name">
                <img src={LocalizationLogo} alt="LocLogo"/>
                <h2>{city.city}</h2>
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