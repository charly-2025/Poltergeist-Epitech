import {use, useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Localization from "./pages/Localization";
import Favorite from "./pages/Favorite";
import Feedback from "./pages/Feedback";
import Support from "./pages/Support";
import StartPage from './pages/StartPage';



function App() {
  const [localization, setLocalization] = useState(null);

  useEffect(() => {
    const fetchLocalization = async () => {
      try {
        const response = await fetch('http://localhost:3000/getUserInfos', {method: 'GET', credentials: 'include'});
        const data = await response.json();
        if (data.location.country && data.location.city) {
          setLocalization({ country: data.location.country, city: data.location.city });
        }
      } catch (error) {
        console.error("Error fetching localization data:", error);
      }  
    };

    fetchLocalization();
  }, []);


  useEffect(() => {
    const updateLocalization = async () => {
      fetch('http://localhost:3000/updateLocation', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ country: localization?.country, city: localization?.city }),
      });
      console.log("Localization updated:", localization);
    };
    updateLocalization();
  }, [localization]); 





  /*use effect pour récuperer la localisation une fois+un autre pour mettre a jour la localisation*/

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage/>}/>
          <Route path="/home" element={<Home localization={localization} />} />
          <Route path="/localization" element={<Localization localization={localization} setLocalization={setLocalization} />} />
          <Route path="/favorite" element={<Favorite localization={localization} />} />
          <Route path="/feedback" element={<Feedback localization={localization} />} />
          <Route path="/support" element={<Support localization={localization} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
