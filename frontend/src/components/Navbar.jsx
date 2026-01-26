import React from "react";
import './Navbar.css';
import HomeIcon from '../images/home.png';
import LocalizationIcon from '../images/location.png';
import FavoriteIcon from '../images/wishlist.png';
import FeedbackIcon from '../images/message.png';
import SupportIcon from '../images/support.png';
import HomeIconVert from '../images/home-vert.png';
import LocalizationIconVert from '../images/location-vert.png';
import FavoriteIconVert from '../images/wishlist-vert.png';
import FeedbackIconVert from '../images/message-vert.png';
import SupportIconVert from '../images/support-vert.png';   
import { Link,useLocation } from "react-router-dom";


const Navbar = () => { 
  const location = useLocation();
  const page = location.pathname;

  return (
    <div className="navbar">
        <Link to="/"><div className={page==="/"?"nav-item selected":"nav-item"}><img src={page==="/"?HomeIconVert:HomeIcon} style={{height:20}} alt="Home" className="img-home"/>Home</div></Link>
        <Link to="/localization"><div className={page==="/localization"?"nav-item selected":"nav-item"}><img src={page==="/localization"?LocalizationIconVert:LocalizationIcon} style={{height:20}} alt="Localisation" className="img-localization"/>Localisation</div></Link>
        <Link to="/favorite"><div className={page==="/favorite"?"nav-item selected":"nav-item"}><img src={page==="/favorite"?FavoriteIconVert:FavoriteIcon} style={{height:20}} alt="Favorite" className="img-favorite"/>Favorite</div></Link>
        <Link to="/feedback"><div className={page==="/feedback"?"nav-item selected":"nav-item"}><img src={page==="/feedback"?FeedbackIconVert:FeedbackIcon} style={{height:20}} alt="FeedBack" className="img-feedback"/>FeedBack</div></Link>
        <Link to="/support"><div className={page==="/support"?"nav-item selected":"nav-item"}><img src={page==="/support"?SupportIconVert:SupportIcon} style={{height:20}} alt="Support" className="img-support"/>Support</div></Link>
    </div>
  );
};

export default Navbar;
