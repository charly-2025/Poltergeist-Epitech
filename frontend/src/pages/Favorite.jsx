import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useNavigate} from "react-router-dom";
import { useEffect,useState } from "react";

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
                <h1>Favorite Page</h1>
            </div>
            <Footer />
        </div>
    );
}

export default Favorite;