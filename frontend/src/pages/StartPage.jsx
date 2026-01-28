import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () =>{
    const navigate = useNavigate();

    useEffect(() => {
  const checkAuth = async () => {
    const res = await fetch("http://localhost:3000/check", {
        method : "POST",
      credentials: "include"
    });

    if (res.ok) {
      navigate("/home"); 
    }
  };

    checkAuth();
    }, []);

    const registerUser = async () => {
  try {
    const res = await fetch("http://localhost:3000/register", {
      method: "POST",
      credentials: "include"
    });

    if (!res.ok) {
      console.error("Erreur register");
      return;
    }

    navigate("/home")
    } catch (err) {
        console.error(err);
    }
    };

    return(
        <div>
            <button onClick={registerUser}> Accepter les cookies</button>
        </div>
    );
}

export default StartPage;