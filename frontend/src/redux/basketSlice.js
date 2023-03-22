import { createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

const initialState = {
    loading: false,
    pizzaBasket: [],
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addToBasket: (state, { payload }) => {
            const index = state.pizzaBasket.findIndex(bItem =>
                bItem._id === payload._id
                && bItem.size === payload.size
                && bItem.crust === payload.crust
            )

            if (index === -1) {
                // bu o demekdiki basketde pizza 1 yoxdu 
                state.pizzaBasket = [...state.pizzaBasket, payload]
            } else {
                // bu o demekdiki basketde
                //  hemin  o pizza var 
                state.pizzaBasket[index] = {...state.pizzaBasket[index] , count : payload.count }
            }
        },
    },
    extraReducers: {

    }
})

export const { addToBasket } = basketSlice.actions

export default basketSlice.reducer
