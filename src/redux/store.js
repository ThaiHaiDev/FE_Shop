import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/Auth/userSlice'
import cartSlice from '../features/Cart/cartSlice'

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store