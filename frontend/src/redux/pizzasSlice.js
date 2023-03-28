import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas",
    async (page) => {
        const { data: { pizzas, currentPage, numberOfPages } } = await Axios.get(`/pizzas/?page=${page}`)
        return { pizzas, currentPage, numberOfPages }
    }
)

export const getPizzaByCategory = createAsyncThunk("pizzas/fetchPizzasByCat",
    async (category) => {
        const { data } = await Axios.get(`/pizzas/category?cat=${category}`)
        return data
    }
)

export const getPizzaBySearch = createAsyncThunk("pizzas/fetchPizzasBySearch",
    async (pizza) => {
        const { data } = await Axios.get(`/pizzas/search?searchQuery=${pizza}`)
        return data
    }
)

const initialState = {
    loading: false,
    pizzaData: [],
    currentPage: 1,
    numberOfPages: undefined,
    pizzaModal: false,
    selectedPizza: {}
}

export const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers: {
        getPizzaBySort: (state, { payload }) => {
            if (payload === "популярности") {
                state.pizzaData = state.pizzaData.sort((a, b) => {
                    return b.salesNum - a.salesNum;
                })
            } else if (payload === "цене") {
                state.pizzaData = state.pizzaData.sort((a, b) => {
                    return a.priceS - b.priceS;
                })
            }
        },
        paginateTofirst: (state, { payload }) => {
            state.currentPage = 1
        },
        setPizzaModal: (state, { payload }) => {
            state.pizzaModal = payload
        },
        selectPizzaForModal: (state, { payload }) => {
            state.selectedPizza = state.pizzaData.find(pizza => pizza._id === payload)
        },
    },
    extraReducers: {
        [fetchPizzas.pending]: (state) => {
            state.loading = true
        },
        [fetchPizzas.fulfilled]: (state, { payload }) => {
            state.pizzaData = payload.pizzas
            state.currentPage = payload.currentPage
            state.numberOfPages = payload.numberOfPages
            state.loading = false
        },
        [fetchPizzas.rejected]: (state, action) => {
            console.log(action.error);
        },
        [getPizzaByCategory.fulfilled]: (state, { payload }) => {
            state.pizzaData = payload
            state.loading = false
        },
        [getPizzaByCategory.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getPizzaBySearch.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getPizzaBySearch.fulfilled]: (state, { payload }) => {
            state.pizzaData = payload
            state.loading = false
        },
    }
})

export const { getPizzaBySort, paginateTofirst, setPizzaModal, selectPizzaForModal } = pizzaSlice.actions

export default pizzaSlice.reducer
