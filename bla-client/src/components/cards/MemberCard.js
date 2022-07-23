import '../../styles/memberCard.css'
import React from "react";

const MemberCard = () => {

  return (
    <div className="card-params">
        <span className="member-name">Kaye Love</span>
        <img className="profile-img" src={require('../../images/User.png')} alt=""/>
        <p className="memberDate">Member Since 2020</p>
        <p className="socialHandle">Social @kayelove</p>
        <button className="profileButton">See More</button>
    </div>
  );
};

export default MemberCard;