import React, { useEffect, useState } from "react";
import LocalizationLogo from "../images/location.png";
import "./CityCard.css";

const CityCard = ({listCity,localization,setLocalization,city}) => {
    const [nbThread,setNbThread] = useState(0);

    useEffect(() => {
        const fetchNbThread = async () => {
            try {
                const response = await fetch(`http://localhost:3000/location/nbThreads/${city.city}`, {method: 'GET', credentials: 'include'});
                const data = await response.json();
                setNbThread(data.nb_threads);
            } catch (error) {
                console.error("Error fetching nb threads:", error);
            }
        };
        fetchNbThread();
    }, [listCity]);

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