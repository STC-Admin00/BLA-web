import "../../styles/authorsHub.css"
import React from 'react'

const AuthorsHub = () => {
  
  return (
    <div className="hub-authors">
      <h2 className="title-authorsHub">Authors</h2>
      <div className="grp-authorsHub">
        <button className="getBtn">GET</button>
        <button className="postBtn">POST</button>
        <button className="delBtn">DEL</button>
        <button className="patBtn">PAT</button>
      </div>
    </div>
  )
}

export default AuthorsHub