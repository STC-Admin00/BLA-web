import "../../../styles/signIn.css"
import React from 'react'

const SignIn = () => {

    
        return (
        <section className="showcase">
            
        <div className="container-signin">
            <ul className="top">
                <h1 className="upper">Welcome to the</h1>
                <h2 className="lower">BLACK LIT APP</h2>
            </ul>
            <ul className="btnPnl">
                <li>
                    <img className="lgButton" src={require('../../../images/Apple Button.png')} alt=""></img>
                </li>
                <li>
                    <img className="lgButton" src={require('../../../images/Google Button.png')} alt=""></img>
                </li>
                <li>
                    <img className="lgButton" src={require('../../../images/Email Button.png')} alt=""></img>
                </li>
                <li>
                    <img className="joinButton" src={require('../../../images/Join Button.png')} alt=""></img>
                </li>
                <li>
                    <h4 className="finePt"> By continuing, you agree to accept our<br/>Privacy Policy &#38; Terms of Service </h4>
                </li>
            </ul>
            </div>
        </section>
    )
};

export default SignIn;