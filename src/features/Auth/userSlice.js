import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../../api/userApi'

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        // call API to register
        const data = await userApi.register(payload)
        // sava data to local storage
        localStorage.setItem('access_token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        // return user data
        return data.user
    }
)

export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        // call API to register
        const data = await userApi.login(payload)
        // sava data to local storage
        localStorage.setItem('access_token', data.jwt)
        localStorage.setItem('user', JSON.stringify(data.user))
        // return user data
        return data.user
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem('user')) || {},
        settings: {}
    },
    reducers: {
        logout(state) {
            localStorage.removeItem('user')
            localStorage.removeItem('access_token')
            state.current = {}
        }

    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },

        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    }
})

export default userSlice