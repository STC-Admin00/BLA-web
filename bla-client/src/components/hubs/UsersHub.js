import "../../styles/usersHub.css"
import React from 'react'

const UsersHub = () => {

  return (
    <div className="hub-users">
      <h2 className="title-usersHub">Users</h2>
      <div className="grp-usersHub">
        <button className="getBtn">GET</button>
        <button className="postBtn">POST</button>
        <button className="delBtn">DEL</button>
      </div>
    </div>
  )
}

export default UsersHub