import { useState, useEffect } from "react";
import "./Post.css";

import { Like,Comment,Favorite } from "./Like-Com-Fav.jsx";
import {Avatar} from "@heroui/react";

import Marker from "../images/marker.png";

const Post = (/*recupere toutes les données envoyer depuis le parents*/) => { 
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
            <div className="Post-Username">Anonymous<p>- {/*temps depuis postés*/} ago </p></div>
            <p className="Post-UserLocation"><img src={Marker} alt="marker" /> {/*localisation de la ville du post*/}</p>
          </div>
        </div>
        <div className="Post-content">
          <div className="Post-Title">{/*Titre du post */}</div>
          <p className="Post-Text">{/*Contenu du post */}</p>
        </div>
        <div className="Post-footer">
          <div className="Like-Com"><Like isLiked={isLiked} handleLike={handleLike}  /><Comment openComments={openComments}/></div>
          <Favorite isFavorited={isFavorited} handleFavorite={handleFavorite} />
        </div>
    </div>
  );
};

export default Post;
