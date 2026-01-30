import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import { useEffect} from "react";
import "./Favorite.css";

const Favorite = ({localization}) => {
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


    return (
        <div className="Favorite-page">
            <Header localization={localization} />
            <div className="Favorite-content">
                <div className="ComingSoon-container">
                  <h1>Coming Soon</h1>
                  <p>We’re working on this feature.<br />Stay connect!</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Favorite;