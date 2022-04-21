import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/Auth/userSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
})

export default store