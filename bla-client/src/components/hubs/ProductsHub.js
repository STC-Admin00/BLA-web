import "../../styles/productsHub.css"
import React from 'react'

const ProductsHub = () => {
  return (
    <div class="hub-products">
      <h2 className="title-productsHub">Products</h2>
      <div className="grp-productsHub">
        <button className="getBtn">GET</button>
        <button className="postBtn">POST</button>
        <button className="delBtn">DEL</button>
        <button className="patBtn">PAT</button>
      </div>
    </div>
  )
}

export default ProductsHub