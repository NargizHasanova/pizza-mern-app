import { configureStore } from "@reduxjs/toolkit"
import pizzasReducer from "./pizzasSlice"
import basketReducer from "./basketSlice"

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        basket: basketReducer,
    }
})

