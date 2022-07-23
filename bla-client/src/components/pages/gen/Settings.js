import React from 'react'
import '../../../styles/settings.css'
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/useLogout';

const Settings = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/home');
    }

  return (
    <section>
        <h1>Sign Out</h1>
        <br />
        <button onClick={signOut}>Click Me!</button>
        <br />
        <h1>Directory</h1>
        <Link to='/directory'>Click Here!</Link>
        
        
    </section>
  )
}

export default Settings