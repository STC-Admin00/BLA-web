import React from 'react'
import '../../../styles/userProfile.css'
import VertLines from '../../../images/Vertical Lines.png'
import StoryList from '../../tables/Stories'

const UserProfile = () => {
  return (
    <div className='triVertSplitContainer'>
        <div>
          <StoryList />
        </div>
        <div>
          <img className='vertLines'src={VertLines}></img>
        </div>
        <div>
          <h2 className='userProfileGreeting'>Good morning,<br/>
              Kaye
          </h2>
        </div>
    </div>
  )
}

export default UserProfile