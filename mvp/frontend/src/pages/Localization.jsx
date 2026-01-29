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
  { country: "France", city: "Paris" },
  { country: "France", city: "Lyon" },
  { country: "France", city: "Marseille" },
  { country: "France", city: "Toulouse" },
  { country: "France", city: "Nice" },
  { country: "France", city: "Nantes" },
  { country: "France", city: "Strasbourg" },
  { country: "France", city: "Montpellier" },
  { country: "France", city: "Bordeaux" },
  { country: "France", city: "Lille" },
  { country: "Royaume-Uni", city: "Londres" },
  { country: "Royaume-Uni", city: "Manchester" },
  { country: "Royaume-Uni", city: "Liverpool" },
  { country: "Royaume-Uni", city: "Birmingham" },
  { country: "Royaume-Uni", city: "Leeds" },

  { country: "Allemagne", city: "Berlin" },
  { country: "Allemagne", city: "Munich" },
  { country: "Allemagne", city: "Hambourg" },
  { country: "Allemagne", city: "Cologne" },
  { country: "Allemagne", city: "Francfort" },

  { country: "Espagne", city: "Madrid" },
  { country: "Espagne", city: "Barcelone" },
  { country: "Espagne", city: "Valence" },
  { country: "Espagne", city: "Séville" },
  { country: "Espagne", city: "Bilbao" },

  { country: "Italie", city: "Rome" },
  { country: "Italie", city: "Milan" },
  { country: "Italie", city: "Naples" },
  { country: "Italie", city: "Turin" },
  { country: "Italie", city: "Florence" },

  { country: "États-Unis", city: "New York" },
  { country: "États-Unis", city: "Los Angeles" },
  { country: "États-Unis", city: "Chicago" },
  { country: "États-Unis", city: "Houston" },
  { country: "États-Unis", city: "San Francisco" },
  { country: "Canada", city: "Toronto" },
  { country: "Canada", city: "Montréal" },
  { country: "Canada", city: "Vancouver" },
  { country: "Canada", city: "Calgary" },
  { country: "Canada", city: "Ottawa" },

  { country: "Japon", city: "Tokyo" },
  { country: "Japon", city: "Osaka" },
  { country: "Japon", city: "Kyoto" },
  { country: "Japon", city: "Yokohama" },
  { country: "Japon", city: "Nagoya" }
]);
    const [listCitySecond, setListCitySecond] = useState(listCity);
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

    useEffect(() => {
      const fetchLocatizations = async () => {
        try {
          const response = await fetch(`http://localhost:3000/location?search=${searchCity}`, {
            method: "GET",
            credentials: "include"
          });
          if (!response.ok) return;
          const data = await response.json();
          console.log(data);
          setListCity(data);
        } catch (error) {
          console.error("Error fetching localizations:", error);
        }
      };

      if (searchCity !== "" || CountryFiltered !== "all") {
        fetchLocatizations();
      } else if (searchCity === "" && CountryFiltered === "all") {
        setListCity(listCitySecond);
      }
    }, [searchCity, CountryFiltered]);

    

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