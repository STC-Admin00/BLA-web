import "../../../styles/home.css";
import React from 'react'
import { Link } from 'react-router-dom';
import SignInButton from '../../../images/Sign In Email Button.png'
import SignUpButton from '../../../images/Sign Up Email Button.png'
import Fire from '../../../images/Fire.png'
import Phone from '../../../images/Phone Ex.png'

const Home = () => {
    return (
        <section>
        <div>
            <h1 className="heading">Intriguing hook will go here.</h1>
            <h2 className="pitch">An app that provides something that links <br/> with the intrigue mentioned above.</h2>
            <ul className="buttons">
                <li><Link to="/emailLogin"><img className="button-item" src={SignInButton} alt=""></img></Link></li>
                <li><Link to="/signUp"><img className="button-item" src={SignUpButton} alt=""></img></Link></li>
            </ul>
        </div>
        <div>
            <img className="fire" src={Fire} alt=""></img>
        </div>
        <div>
            <img className="phone-ex" src={Phone} alt=""></img>
        </div>
        </section>
    )
}

export default Home;