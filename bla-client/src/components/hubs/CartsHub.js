import "../../styles/cartsHub.css"
import React from 'react'

const CartsHub = () => {
  
  return (
    <div className="hub-carts">
      <h2 className="title-cartsHub">Carts</h2>
      <div className="grp-cartsHub">
        <button className="getBtn">GET</button>
        <button className="postBtn">POST</button>
        <button className="delBtn">DEL</button>
        <button className="patBtn">PAT</button>
      </div>
    </div>
  )
}

export default CartsHub