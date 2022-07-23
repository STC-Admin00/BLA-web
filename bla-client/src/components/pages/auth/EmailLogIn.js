import "../../../styles/emailLogin.css";
import React, { useRef, useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../../hooks/useInput';
import useAuth from '../../../hooks/useAuth'
import axios from '../../../api/axios';

const LOGIN_URL='/api/auth/login'

const EmailLogIn = () => {
    const { setAuth, persist, setPersist } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/directory";

    const userRef = useRef();
    const errRef = useRef();

    const [email, resetEmail, userAttribs] = useInput('user', '');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken });
            resetEmail();
            setPassword('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unautorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus();
        }

        console.log('Success!')
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(() => {
        localStorage.setItem("persist", persist);
    }, [persist])

    return (
        <section className="showcase">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <div className="container-emaillogin">
            <div className="header">SIGN IN</div>
            <form onSubmit={handleSubmit}>
                <div className="user-details">
                    <div className="user-input">
                        <label htmlFor="email" className="details">Email Address</label>
                        <input 
                            className="field"
                            id="email"
                            ref={userRef}
                            autoComplete="off"
                            {...userAttribs}
                            required
                        />
                    </div>
                    <div className="user-input">
                        <label htmlFor="current-password" className="details">Password</label>
                        <input 
                            className="field"
                            type="password"
                            id="current-password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                </div>
                <button className="smButton" >Log In</button>
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Trust This Device</label>
                </div>
            </form>
            </div>    
    </section>
    )
}

export default EmailLogIn