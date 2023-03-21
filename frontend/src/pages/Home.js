import React, { useEffect, useState } from 'react'
import Main from '../components/main/Main'
import Categories from '../components/categories/Categories'
import Sort from '../components/sort/Sort'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPizzas, getPizzaByCategory, getPizzaBySort, paginateTofirst } from '../redux/pizzasSlice'
import Paginate from '../components/Pagination/Paginate'
import { useLocation } from 'react-router-dom'
import PizzaModal from '../components/pizzaModal/PizzaModal'


export default function Home() {
    const dispatch = useDispatch()
    const { pizzaModal } = useSelector(state => state.pizzas)
    const categories = ['Все', 'Мясные', 'Вегетерианские', 'Куриные', 'Острые']
    const sortItems = ["популярности", "цене"]
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)
    const [activeSortIndex, setActiveSortIndex] = useState(0)
    const [openModal, setOpenModal] = useState(false)
    const query = new URLSearchParams(useLocation().search)
    // console.log(useLocation())//{pathname: '/posts', search: '?page=2', hash: '', state: null, key: 'z1ornz3g'}
    const page = query.get('page') || 1;


    function handleSort(i) {
        setActiveSortIndex(i)
        setOpenModal(false)
        dispatch(getPizzaBySort(sortItems[i])) // useState gec deyisir deye sortItems[activeSortIndex] yazmiram
    }

    function selectCategory(index) {
        setActiveCategoryIndex(index) // click etdiyimiz category qara olsun deye fonu
        setActiveSortIndex(0) // sort default veziyyetine qayitsin basqa kategoriye kecende
        dispatch(getPizzaByCategory(categories[index]))
        dispatch(paginateTofirst())
    }

    useEffect(() => {
        dispatch(fetchPizzas(page))
    }, [])

    return (
        <>
            <div className="content__top">
                <Categories
                    selectCategory={selectCategory}
                    categories={categories}
                    activeIndex={activeCategoryIndex} />
                <Sort
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    sortItems={sortItems}
                    handleSort={handleSort}
                    activeSortIndex={activeSortIndex} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <Main />
            <Paginate />
            {pizzaModal && <PizzaModal />}
        </>
    )
}


