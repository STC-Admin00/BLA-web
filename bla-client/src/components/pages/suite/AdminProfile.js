import '../../../styles/adminProfile.css'
import React from 'react'
import Users from '../../tables/Users'
import { Link } from 'react-router-dom'
import HorizLines from '../../../images/Horizontal Lines.png'

const AdminProfile = () => {
  return (
    <div className='triHorizSplitContainer'>
      <div>
          <h2 className='adminProfileGreeting'>Good morning,<br/>
              Mr. Noir
          </h2>
      </div>
      <div>
          <img className='horizLines' src={HorizLines}></img>
      </div>
      <div>
          <button className='btn'>Data Visualization</button>
            <Link to='/dataHub'>
          <button className='btn'>Data Management</button>
            </Link>
          <button className='btn'>Notification Suite</button>
      </div>
    </div>
  )
}

export default AdminProfile