import React, { useEffect, useRef, useState } from 'react'
import bestseller from "../../assets/img/a.png"
import { useDispatch } from 'react-redux';
import { handleBasket } from '../../redux/basketSlice';
import { selectPizzaForModal, setPizzaModal } from '../../redux/pizzasSlice';


export default function Pizza({ pizza, name, img, crust, size, priceS, salesNum, _id }) {
    const dispatch = useDispatch()
    const [activeCrust, setActiveCrust] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

    function addPizza() {
        dispatch(setPizzaModal(true))
        dispatch(selectPizzaForModal(_id))
    }
    function handleCrust(crustIndex, crustName) {
        setActiveCrust(crustIndex)
        // dispatch(handleBasket({ crustName, ...pizza }))
    }
    function handleSize(sizeIndex, sizeName) {
        setActiveSize(sizeIndex)
        // dispatch(handleBasket({ sizeName, ...pizza }))
    }

    function openModal() {
        dispatch(setPizzaModal(true))
        dispatch(selectPizzaForModal(_id))
    }

    return (
        <div className="pizza-block" onClick={openModal} >

            {salesNum > 3 &&
                <img
                    className='bestseller-img'
                    src={bestseller}
                    alt='best-choice' />}
            <img
                // onClick={openModal}
                className="pizza-block__image"
                src={img}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {crust.map((item, index) => (
                        <li key={index}
                            className={activeCrust === index ? "active" : ""}
                            onClick={() => handleCrust(index, item)}>
                            {item}
                        </li>
                    ))}
                </ul>
                <ul>
                    {size.map((item, index) => (
                        <li key={index}
                            className={activeSize === index ? "active" : ""}
                            onClick={() => handleSize(index, item)}>
                            {item} см
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {priceS} AZN</div>
                <div
                    className={`button  button--add button--outline `}
                    onClick={addPizza}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span> Добавить</span>
                </div>
            </div>
            
        </div>
    )
}
