import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setPizzaModal } from '../../redux/pizzasSlice';
import { addToBasket } from '../../redux/basketSlice';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import "./PizzaModal.scss"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PizzaModal() {
    const dispatch = useDispatch()
    const { pizzaModal, selectedPizza } = useSelector(state => state.pizzas)
    const { pizzaBasket } = useSelector(state => state.basket)
    console.log(pizzaBasket);

    // PIZZA CRUST
    const crust = ["тонкое", "традиционное"]
    const [crustIndex, setCrustIndex] = useState(0) // css ucun yaratmisiq

    // PIZZA SIZE
    const pizzaSizes = ["26", "30", "40"]
    const [currSize, setCurrSize] = useState("26")

    // PIZZA COUNT
    const [pizzaCount, setPizzaCount] = useState(1)

    // PIZZA PRICE BY SIZE
    let pizzaPriceBySize = selectedPizza.priceS // default value


    switch (currSize) {
        case "26":
            pizzaPriceBySize = selectedPizza.priceS * pizzaCount
            break;

        case "30":
            pizzaPriceBySize = selectedPizza.priceM * pizzaCount
            break;

        case "40":
            pizzaPriceBySize = selectedPizza.priceB * pizzaCount
            break;

        default:
            break;
    }

    function decreaseCount() {
        if (pizzaCount !== 1) {
            setPizzaCount(prev => prev - 1)
        }
    }

    function increaseCount() {
        setPizzaCount(prev => prev + 1)
    }

    function handleBasket() {
        dispatch(addToBasket({
            _id: selectedPizza._id,
            name: selectedPizza.name,
            img: selectedPizza.img,
            crust: crust[crustIndex],
            size: currSize,
            count: pizzaCount,
            price: pizzaPriceBySize,
            salesNum: 0
        }))

        setCrustIndex(0)
        setPizzaCount(1)
        setCurrSize("26")
        pizzaPriceBySize = selectedPizza.priceS
        dispatch(setPizzaModal(false))

    }


    function closeModal() {
        dispatch(setPizzaModal(false))
    }

    return (
        <Modal
            open={pizzaModal}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="modal-content" >
                    {/* close button */}
                    <div className="modal-header">
                        <span className="close" onClick={closeModal}>&times;</span>
                    </div>
                    {/* pizza image */}
                    <div className='pizza-img'>
                        <img src={selectedPizza.img} alt="pizza" />
                    </div>
                    {/* pizza name */}
                    <h2>{selectedPizza.name}</h2>
                    {/* pizza crust */}
                    <div className='crust'>
                        {crust.map((item, index) => (
                            <span
                                onClick={() => setCrustIndex(index)}
                                key={index}
                                className={`crust-${crustIndex + 1} ${crustIndex === index ? "selected-crust" : ""}`}>{item}
                            </span>
                        ))}

                    </div>
                    {/* pizza select */}
                    <div className='select'>
                        <select onChange={(e) => setCurrSize(e.target.value)}>
                            {pizzaSizes.map((size, index) => (
                                <option
                                    key={index}
                                    value={size}>small- {size}sm
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* pizza count */}
                    <div className='count-price'>
                        <div className="count">
                            <span className="minus" onClick={decreaseCount}>-</span>
                            <span className="item-count">{pizzaCount}</span>
                            <span className="plus" onClick={increaseCount}>+</span>
                        </div>
                        <div className='price'>
                            <b>{pizzaPriceBySize}$</b>
                        </div>
                    </div>
                    <div className='basket-modal'>
                        <button onClick={handleBasket}>в корзину</button>
                    </div>

                </div>
            </Box>

        </Modal>

    );
}
