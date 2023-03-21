import React from 'react'
import Pizza from './Pizza'
import { useSelector } from 'react-redux'
import { Skeleton } from './Skeleton'
import { NotFound } from '../../pages/notFound/NotFound'
import './pizza-block.scss'

export default function Main() {

    const { pizzaData, loading } = useSelector(state => state.pizzas)
    const { pizzaBasket } = useSelector(state => state.basket)

    return (
        <div className="content__items">

            {
                loading === false
                    ? pizzaData.length > 0
                        ? pizzaData.map(item => (
                            <Pizza {...item} key={item._id} pizza={item} />
                        ))
                        : <NotFound />
                    : <>
                        {/*[...new Array(6)].map((_, index) => <Skeleton key={index} />) */}
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
            }
            
        </div>
    )
}

