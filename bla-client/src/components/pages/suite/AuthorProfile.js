import '../../../styles/authorProfile.css'
import React from 'react'
import VertLines from '../../../images/Vertical Lines.png'

const AuthorProfile = () => {
  return (
    <div className='triVertSplitContainer'>
      <div>
        <h2 className='authorProfileGreeting'>Good morning,<br/>
              Wright
        </h2>
      </div>
      <div>
        <img className='vertLines' src={VertLines}></img>
      </div>
      <div>
        <button className='btns'>Metrics</button>
        <button className='btns'>Support</button>
      </div>
    </div>
  )
}

export default AuthorProfile