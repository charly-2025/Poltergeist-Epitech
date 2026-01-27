import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CityCard from "../components/CityCard.jsx";
import { useEffect,useState } from "react";
import "./Localization.css";


const Localization = ({ localization, setLocalization }) => {
    const [listCity, setListCity] = useState([{country:"France",name:"Paris"},{country:"Royaume-Unis",name:"Londres"}]);
    const [listCountry, setListCountry] = useState([]);
    const [CountryFiltered, setCountryFiltered] = useState("all");
    const [searchCity, setSearchCity] = useState("");

    useEffect(() => {/*Fetch list ville filtré */}, [searchCity, CountryFiltered]);

    

    return (
        <div className="Localization-page">
            <Header localization={localization} />
            <div className="Localization-content">
                <div className="Localization-wrapper">
                    <div className="Localization-page-title">
                    <h1>Localization Page</h1>
                    <p>Set your localization preferences here.</p>
                    </div>
                    <div className="Localization-searchBar">
                    </div>
                    <div className="Localization-CountryFilter"> 

                    </div>
                    <div className="Localization-listCity">
                        {listCity.map(city=>(<CityCard localization={localization} setLocalization={setLocalization} city={city}/>/*CityCard + variabele */))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}; 

export default Localization;