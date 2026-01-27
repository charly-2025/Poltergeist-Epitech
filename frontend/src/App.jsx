import {useEffect,useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Localization from "./pages/Localization";
import Favorite from "./pages/Favorite";
import Feedback from "./pages/Feedback";
import Support from "./pages/Support";



function App() {
  const [localization, setLocalization] = useState(null);

  useEffect(() => {console.log(localization)}, [localization]);

  /*use effect pour récuperer la localisation une fois+un autre pour mettre a jour la localisation*/

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home localization={localization} setLocalization={setLocalization} />} />
          <Route path="/localization" element={<Localization localization={localization} setLocalization={setLocalization} />} />
          <Route path="/favorite" element={<Favorite localization={localization} setLocalization={setLocalization}/>} />
          <Route path="/feedback" element={<Feedback localization={localization} setLocalization={setLocalization}/>} />
          <Route path="/support" element={<Support localization={localization} setLocalization={setLocalization}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
