import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { HeroUIProvider } from "@heroui/react";
import "leaflet/dist/leaflet.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </React.StrictMode>
);

