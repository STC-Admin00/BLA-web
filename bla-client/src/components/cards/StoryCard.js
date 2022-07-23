import '../../styles/StoryCard.css'
import React from "react";

const StoryCard = () => {

  return (
    <div className="card">
        <span className="title">Buddy</span>
        <img src="null" alt="There" className="img" />
        <p className="desc">Hi</p>
        <button className="actionButton">Read More</button>
    </div>
  );
};

 export default StoryCard;