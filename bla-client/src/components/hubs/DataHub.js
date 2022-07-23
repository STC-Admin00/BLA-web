import "../../styles/dataHub.css"
import StoriesHub from './StoryHub'
import UsersHub from './UsersHub'
import AuthorsHub from './AuthorsHub'
import ProductsHub from './ProductsHub'
import OrdersHub from './OrdersHub'
import CartsHub from './CartsHub'
import React from 'react'

const DataHub = () => {

  return (
    <section className="showcase-dataHub">
        <main className="main-dataHub">
            <h2 className="title-dataHub">Data Management Hub</h2>
            <div className="container-dataHub">
                <StoriesHub />
                <UsersHub />
                <AuthorsHub />
                <ProductsHub />
                <OrdersHub />
                <CartsHub />
            </div>
        </main>
    </section>
    )
}

export default DataHub