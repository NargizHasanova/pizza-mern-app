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
                state.pizzaBasket[index] = { ...state.pizzaBasket[index], count: payload.count }
            }
        },
        plusCount: (state, { payload }) => {
            console.log();
            state.pizzaBasket.map(bItem => {
                if (bItem._id === payload) {
                    bItem.count += 1;
                }
                return bItem;
            })
        },
        minusCount: (state, { payload }) => {
            state.pizzaBasket.map(bItem => {
                if (bItem._id === payload) {
                    if (bItem.count !== 1) {
                        bItem.count -= 1;
                    }
                }
                return bItem;
            })
        },
        removeItem: (state, { payload }) => {
            state.pizzaBasket = state.pizzaBasket.filter(item => item._id !== payload)
        },
        clearBasket: (state, { payload }) => {
            state.pizzaBasket = []
        },

    },
    extraReducers: {

    }
})

export const { addToBasket, plusCount, minusCount, removeItem, clearBasket } = basketSlice.actions

export default basketSlice.reducer
