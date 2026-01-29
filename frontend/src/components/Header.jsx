import React from 'react';
import { useState,useEffect } from 'react';

import { useDisclosure, Button } from "@heroui/react";


import Navbar from './Navbar.jsx';
import Navdrawer from './Navdrawer.jsx';

import './Header.css';

import Logo from '../images/logopol.png';
import Burger from '../images/burger-bar.png';
import LocalizationLoc from "../images/location.png"


const Header = ({localization}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {isOpen, onOpen, onOpenChange,onClose} = useDisclosure();
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if(isOpen && window.innerWidth >= 1362){
        onClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth,isOpen,onClose]);




  return (
    <div className={windowWidth < 1362 ? 'Header-smartphone' : 'Header-computer'}>
      {windowWidth<1362 ? 
      <Button className="Burger-button" 
      onPress={onOpen}
      >

        <img src={Burger} alt="Burger" />
        </Button> : ""}
      <Navdrawer isOpen={isOpen} onOpenChange={onOpenChange}/>
      
      
          <div className='Logo-namesite'>
            <img src={Logo} alt="Logo" style={{height:70}} />
            <div className='Header-Name-Loc'>
              <h1>POLTERGEIST</h1>
                  {localization?(<div className='Header-Loc'>
                  <img src={LocalizationLoc} alt='LogoLoc'/>
                  <div>{localization?.country} , {localization.city}</div>
                  </div>):""}
            </div>
          </div>
      {windowWidth>=1362 ? <Navbar/> : ""}
    </div>
    );

};


export default Header;