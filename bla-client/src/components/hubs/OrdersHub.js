import "../../styles/ordersHub.css"
import React from 'react'

const OrdersHub = () => {
  
  return (
    <div className="hub-orders">
      <h2 className="title-ordersHub">Orders</h2>
      <div className="grp-ordersHub">
        <button className="getBtn">GET</button>
        <button className="postBtn">POST</button>
        <button className="delBtn">DEL</button>
        <button className="patBtn">PAT</button>
      </div>
    </div>
  )
}

export default OrdersHub