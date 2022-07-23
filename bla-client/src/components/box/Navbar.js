import "../../styles/navbar.css"
import React from "react";
import { Link } from 'react-router-dom';
import Logo from '../../images/Logo Official.png'
import User from '../../images/User.png'

const Navbar = () => {

    return (
        <div className="navbar-css">
            <ul className="navbar-logoList">
            <li className="navbar-logoListItem-one"><p>BLACK</p></li>
            <li className="navbar-logoListItem-two"><p>LIT</p></li>
            <li className="navbar-logoListItem-three"><p>(erotica)</p></li>
            <li className="logo">
                <img className="logo" src={Logo} alt=''></img>
            </li>
            </ul>
            <ul className="navbar-actionList">
            <li className="navbar-actionListItems">
                <Link to="/home">HOME</Link>
            </li>
            <li className="navbar-actionListItems">LIBRARY</li>
            <li className="navbar-actionListItems">
                <Link to="/settings">SETTINGS</Link>
                </li>
            <li className="navbar-actionListItems">
                <img className="avatar" src={User} alt=""></img>
            </li>
        </ul>
        </div>
    )
};

export default Navbar;