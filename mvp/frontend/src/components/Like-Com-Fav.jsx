import React from "react";
import "./Like-Com-Fav.css";

import likeIcon from "../images/heart.png";
import likeIconVertFilled from "../images/heart-vert-filled.png";

import CommentIcon from "../images/chat.png";

import FavoriteIcon from "../images/wishlist.png";
import FavoriteIconVertFilled from "../images/wishlist-vert-filled.png";

export const Like = ({ isLiked, handleLike}) => {
  return (
    <div className={isLiked ? "Like-liked" : "Like"} onClick={handleLike}>
        <img src={isLiked ? likeIconVertFilled : likeIcon} alt="like"  />
    </div>
  );
}

export const Comment = ({ openComments }) => {
  return (
    <div className="Com" onClick={openComments}>
      <img src={CommentIcon} alt="comment" />
    </div>
  );
}

export const Favorite = ({ isFavorited, handleFavorite }) => {
  return (
    <div className={isFavorited ? "Favorite-favorited" : "Favorite"} onClick={handleFavorite}>
      <img src={isFavorited ? FavoriteIconVertFilled : FavoriteIcon} alt="favorite" />
    </div>
  );
}