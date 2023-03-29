import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Axios } from "../api";

export const signIn = createAsyncThunk("users/fetchLogin",
    async (params) => {
        const { data } = await Axios.post('/user/signin', params.form);
        localStorage.setItem('user', JSON.stringify(data));
        params.navigate('/');
        return data
    }
)

export const signUp = createAsyncThunk("users/fetchRegister",
    async (params) => {
        const { data } = await Axios.post('/user/signup', params.form);
        localStorage.setItem('user', JSON.stringify(data));
        params.navigate('/');
        return data
    }
)

export const sendOrder = createAsyncThunk("user/sendOrder",
    async ({ userId, order, navigate }) => { // params = { userId, order }
        const { data } = await Axios.post(`user/sendOrder/${userId}`, order)
        navigate('/');
        return data
    }
)

const initialState = {
    user: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.clear()
            state.user = null
        },
        getMe: (state) => {
            state.user = JSON.parse(localStorage.getItem('user')) || null
        },
    },
    extraReducers: {
        [signIn.pending]: (state) => {
            state.user = null
        },
        [signIn.fulfilled]: (state, { payload }) => {
            state.user = payload
        },

        [signIn.rejected]: (state, { payload }) => {
            state.user = null
        },
        [signUp.fulfilled]: (state, { payload }) => {
            state.user = payload
        },
        [sendOrder.fulfilled]: (state, { payload }) => {
            console.log(payload);
            console.log('order has been sent successfully');
        }

    }
})

export const { logout, getMe } = userSlice.actions

export default userSlice.reducer
