import "../../../styles/signUp.css";
import React, { useRef, useState, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
require('dotenv');

const REGISTER_URL = '/api/register'
const USER_REGEX = /^(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const FN_REGEX = /^[a-zA-Z]+[a-zA-Z]$/;
const LN_REGEX = /^[a-zA-Z]+[a-zA-Z]$/;
const EM_REGEX = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/;

const SignUp = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [passwordMatch, setPasswordMatch] = useState('');
    const [validPasswordMatch, setValidPasswordMatch] = useState(false);
    const [passwordMatchFocus, setPasswordMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidFirstName(FN_REGEX.test(firstName));
    }, [firstName])

    useEffect(() => {
        setValidLastName(LN_REGEX.test(lastName));
    }, [lastName])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EM_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidPasswordMatch(password === passwordMatch)
    }, [password, passwordMatch])

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, email, username, password, passwordMatch])

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/directory";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(username);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Credentials.");
            return
        }
        console.log(username, firstName, password)
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ firstName, lastName, email, username, password }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            
            setSuccess(true);
            setFirstName('');
            setLastName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setPasswordMatch('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            //errRef.current.focus();
        }
    }

    return (
        <>
        { success ? (
            <section>
            <h1>Success!</h1>
            <p>
            <Link path="/directory">Directory</Link>
            </p>
            </section>
        ) : (
        <section className="showcase-signUp">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="header">SIGN UP</div>
                <form className="user-details-signUp" onSubmit={handleSubmit}>
                        
                            <label htmlFor="firstName" className="details">
                                First Name
                                <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                            </label>
                            <input className="field"
                                   id="firstName" 
                                   type="text"
                                   onChange={(e) => setFirstName(e.target.value)}
                                   value={firstName}
                                   required
                                   aria-invalid={validFirstName ? "true" : "false"}
                                   aria-describedby="fnnote"
                                   onFocus={() => setFirstNameFocus(true)}
                                   onBlur={() => setFirstNameFocus(false)}
                            />
                            <p id="fnnote" className={firstNameFocus && !validFirstName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must begin with a letter.<br />
                            Letters and hyphens allowed.
                            </p>
                        
                        
                            <label htmlFor="lastName" className="details">
                                Last Name
                                <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                            </label>
                            <input className="field"
                                   id="lastName" 
                                   type="text"
                                   onChange={(e) => setLastName(e.target.value)}
                                   value={lastName}
                                   required
                                   aria-invalid={validLastName ? "false" : "true"}
                                   aria-describedby="lnnote"
                                   onFocus={() => setLastNameFocus(true)}
                                   onBlur={() => setLastNameFocus(false)}
                            />
                            <p id="lnnote" className={lastNameFocus && !validLastName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must begin with a letter.<br />
                            Letters and hyphens allowed.
                            </p>
                        
                        
                            <label htmlFor="username" className="details">
                                Username
                                <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                            </label>
                            <input className="field"
                                   id="username" 
                                   type="text"
                                   ref={userRef}
                                   autoComplete="off"
                                   onChange={(e) => setUsername(e.target.value)}
                                   value={username}
                                   required
                                   aria-invalid={validUsername ? "false" : "true"}
                                   aria-describedby="unote"
                                   onFocus={() => setUsernameFocus(true)}
                                   onBlur={() => setUsernameFocus(false)}
                            />
                            <p id="unote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                            </p>
                        
                        
                            <label htmlFor="email" className="details">
                                Email Address
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                            </label>
                            <input className="field"
                                   id="email" 
                                   type="text"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required
                                   aria-invalid={validEmail ? "false" : "true"}
                                   aria-describedby="enote"
                                   onFocus={() => setEmailFocus(true)}
                                   onBlur={() => setEmailFocus(false)}
                            />
                            <p id="enote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be an address which is not currently stord in the database.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, and special characters allowed.<br />
                            Must be a valid email address.
                            </p>
                        
                        
                        
                            <label htmlFor="password"className="details">
                                Password
                                <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                            </label>
                            <input className="field"
                                   id="password" 
                                   type="password"
                                   autoComplete="off"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required
                                   aria-invalid={validPassword ? "false" : "true"}
                                   aria-describedby="pwdnote"
                                   onFocus={() => setPasswordFocus(true)}
                                   onBlur={() => setPasswordFocus(false)}
                            />
                            <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>
                        

                        
                            <label htmlFor="confirmpassword" className="details">
                                Confirm Pasword
                                <FontAwesomeIcon icon={faCheck} className={validPasswordMatch && passwordMatch ? "valid" : "hide"} />
                                <FontAwesomeIcon icon={faTimes} className={validPasswordMatch || !passwordMatch ? "hide" : "invalid"} />
                            </label>
                            <input className="field"
                                   id="confirmpassword"
                                   type="password"
                                   autoComplete="off"
                                   onChange={(e) => setPasswordMatch(e.target.value)}
                                   value={passwordMatch}
                                   required
                                   aria-invalid={validPasswordMatch ? "false" : "true"}
                                   aria-describedby="confirmnote"
                                   onFocus={() => setPasswordMatchFocus(true)}
                                   onBlur={() => setPasswordMatchFocus(false)}
                            />
                            <p id="confirmnote" className={passwordMatchFocus && !validPasswordMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                            </p>
                        
                    <button disabled={!validFirstName || !validLastName || !validUsername || !validEmail || !validPassword || !validPasswordMatch ? true : false}>
                        Join Now
                    </button>
                </form>
                <p className="bottoms">
                        Already registered?<br />
                        <span>
                            <Link to="/home">Take Me Home!</Link>
                        </span>
                    </p>
                   
        </section>
        )}
        </>
    )
}

export default SignUp;