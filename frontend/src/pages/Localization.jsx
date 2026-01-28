import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import CityCard from "../components/CityCard.jsx";
import { useEffect,useState } from "react";
import "./Localization.css";
import SearchLoop from "../images/search.png";
import CloseCross from "../images/close.png";
import {useNavigate} from "react-router-dom";

const Localization = ({ localization, setLocalization }) => {
const [listCity, setListCity] = useState([
  { country: "France", name: "Paris" },
  { country: "France", name: "Lyon" },
  { country: "France", name: "Marseille" },
  { country: "France", name: "Toulouse" },
  { country: "France", name: "Nice" },
  { country: "France", name: "Nantes" },
  { country: "France", name: "Strasbourg" },
  { country: "France", name: "Montpellier" },
  { country: "France", name: "Bordeaux" },
  { country: "France", name: "Lille" },

  { country: "Royaume-Uni", name: "Londres" },
  { country: "Royaume-Uni", name: "Manchester" },
  { country: "Royaume-Uni", name: "Liverpool" },
  { country: "Royaume-Uni", name: "Birmingham" },
  { country: "Royaume-Uni", name: "Leeds" },

  { country: "Allemagne", name: "Berlin" },
  { country: "Allemagne", name: "Munich" },
  { country: "Allemagne", name: "Hambourg" },
  { country: "Allemagne", name: "Cologne" },
  { country: "Allemagne", name: "Francfort" },

  { country: "Espagne", name: "Madrid" },
  { country: "Espagne", name: "Barcelone" },
  { country: "Espagne", name: "Valence" },
  { country: "Espagne", name: "Séville" },
  { country: "Espagne", name: "Bilbao" },

  { country: "Italie", name: "Rome" },
  { country: "Italie", name: "Milan" },
  { country: "Italie", name: "Naples" },
  { country: "Italie", name: "Turin" },
  { country: "Italie", name: "Florence" },

  { country: "États-Unis", name: "New York" },
  { country: "États-Unis", name: "Los Angeles" },
  { country: "États-Unis", name: "Chicago" },
  { country: "États-Unis", name: "Houston" },
  { country: "États-Unis", name: "San Francisco" },

  { country: "Canada", name: "Toronto" },
  { country: "Canada", name: "Montréal" },
  { country: "Canada", name: "Vancouver" },
  { country: "Canada", name: "Calgary" },
  { country: "Canada", name: "Ottawa" },

  { country: "Japon", name: "Tokyo" },
  { country: "Japon", name: "Osaka" },
  { country: "Japon", name: "Kyoto" },
  { country: "Japon", name: "Yokohama" },
  { country: "Japon", name: "Nagoya" }
]);
    const [listCountry, setListCountry] = useState([]);
    const [CountryFiltered, setCountryFiltered] = useState("all");
    const [searchCity, setSearchCity] = useState("");
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
                        <img src={SearchLoop} alt="Search" />
                        <input 
                            type="text" 
                            placeholder="Search city..." 
                            value={searchCity} 
                            onChange={(e) => setSearchCity(e.target.value)} 
                        />
                        {searchCity ? (
                            <img src={CloseCross} alt="Close" onClick={() => setSearchCity("")} />
                          ) : ""}
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