import "../../styles/storyHub.css"
import React from 'react'

const StoryHub = () => {
  
  return (
    <div className="hub-stories">
      <h2 className="title-storiesHub">Stories</h2>
      <div className="grp-storiesHub">
        <button className="getBtn">GET</button>
        <button className="getAllBtn">GET ALL</button>
        <button className="postBtn">POST</button>
        <button className="patchBtn">PATCH</button>
        <button className="delBtn">DEL</button>
      </div>
    </div>
  )
}

export default StoryHub