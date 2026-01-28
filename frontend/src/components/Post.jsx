import { useState, useEffect } from "react";
import "./Post.css";

import { Like,Comment,Favorite } from "./Like-Com-Fav.jsx";
import {Avatar} from "@heroui/react";

import Marker from "../images/marker.png";

const Post = ({title,content,country,city,listLike,listCom,createdDate}) => { 
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);


  function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours   = Math.floor(minutes / 60);
  const days    = Math.floor(hours / 24);
  const months  = Math.floor(days / 30);
  const years   = Math.floor(days / 365);

  if (seconds < 60) return "just";
  if (minutes < 60) return `${minutes} min `;
  if (hours < 24)   return `${hours} h `;
  if (days < 30)    return `${days} days `;
  if (months < 12)  return `${months} months `;
  return `${years} years `;
}


  const openComments = () => {
    /*ouvrir la section des commentaires*/
  }

  console.log(isFavorited);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    /*fetch le post pour savoir si l'utilisateur a déjà aimé le post*/
  },[]);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    /*fetch le user_id pour envoyer que l'utilisateur a aimé le post*/
  },[isLiked]);



  return (
    <div className="Post-container">
        <div className="Post-header">
          <Avatar name="Anonymous" className="Post-avatar"/>
          <div className="Post-UserInfo">
            <div className="Post-Username">Anonymous<p>- {timeAgo(createdDate)} ago </p></div>
            <p className="Post-UserLocation"><img src={Marker} alt="marker" /> {country} , {city}</p>
          </div>
        </div>
        <div className="Post-content">
          <div className="Post-Title">{title}</div>
          <p className="Post-Text">{content}</p>
        </div>
        <div className="Post-footer">
          <div className="Like-Com"><Like isLiked={isLiked} handleLike={handleLike}  /><Comment openComments={openComments}/></div>
          <Favorite isFavorited={isFavorited} handleFavorite={handleFavorite} />
        </div>
    </div>
  );
};

export default Post;
