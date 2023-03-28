import { configureStore } from "@reduxjs/toolkit"
import pizzasReducer from "./pizzasSlice"
import basketReducer from "./basketSlice"
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        basket: basketReducer,
        users: userReducer,
    }
})

