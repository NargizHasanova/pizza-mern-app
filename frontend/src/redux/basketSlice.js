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
            
            // state.pizzaBasket = [...state.pizzaBasket, payload]

            if(state.pizzaBasket.length === 0) {
                state.pizzaBasket = [...state.pizzaBasket, payload]
                return
            }

            state.pizzaBasket.map((bItem) => {
                // if (bItem._id !== payload._id) {  // bu pizza basketde yoxdu
                //     console.log('bu pizza basketde yoxdu');
                //     state.pizzaBasket = [...state.pizzaBasket, payload]
                //     return
                // }
                if (bItem._id === payload._id) {  // bu pizza var basketde
                    console.log('bu pizza var basketde');
                    if (bItem.size !== payload.size || bItem.crust !== payload.crust) {
                        state.pizzaBasket = [...state.pizzaBasket, payload]
                        return
                    }
                    bItem.count = payload.count;
                }
                return bItem;
            });
        },
    },
    extraReducers: {

    }
})

export const { addToBasket } = basketSlice.actions

export default basketSlice.reducer
