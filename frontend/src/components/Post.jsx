import { useState, useEffect } from "react";
import "./Post.css";
import { getAvatar } from "../utils/avatars";


import { Like,Comment,Favorite } from "./Like-Com-Fav.jsx";
import {Avatar} from "@heroui/react";
import CommentsPopup from "./CommentsPopup.jsx";

import Marker from "../images/marker.png";

const Post = ({thread_id,title,content,country,city,listLike,listCom,createdDate}) => { 
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/getUserInfos', {method: 'GET', credentials: 'include'});
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  },  []);

  useEffect(() => {
    for (let like of listLike) {
      if (userData && like === userData.anonyme_id) {
        setIsLiked(true);
        break;
      }
    }
  }, [listLike, userData]);

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
    setShowComments(true);
  }


  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleLike = () => {
    const fetchLike = async () => {
      try {
        const response = await fetch(`http://localhost:3000/thread/${thread_id}/like`, {
          method: 'POST',
          credentials: 'include',
        });
        if (response.ok) {
          setIsLiked(!isLiked);
        }
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };
    fetchLike();
  };

  useEffect(() => {
    /*fetch le user_id pour envoyer que l'utilisateur a aimé le post*/
  },[isLiked]);



  return (
    <div className="Post-container">
        <div className="Post-header">
          <Avatar
  src={getAvatar(userData?.userID ?? 0, thread_id)}
  name="Anonymous"
  className="Post-avatar"
/>

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
          <div className="Like-Com"><Like isLiked={isLiked} handleLike={handleLike}  /><Comment openComments={openComments} /></div>
          <Favorite isFavorited={isFavorited} handleFavorite={handleFavorite} />
        </div>
        <CommentsPopup postId={thread_id} open={showComments} onClose={() => setShowComments(false)} />
    </div>
  );
};

export default Post;
