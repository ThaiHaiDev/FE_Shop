import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showMiniCart: false,
        cartItems: [
       
        ],
    },

    reducers: {
        addToCart(state, action) {
            const newItem = action.payload
            const index = state.cartItems.findIndex(x => x.id === newItem.id)
            if (index === 0) {
                state.cartItems[index].quantity += newItem.quantity
            }
            else {
                state.cartItems.push(newItem)
            }
            console.log('newItem: ', newItem)
            console.log('cartItems: ', state.cartItems)
        },
        showMiniCart: (state) => {
            state.showMiniCart = true
        },
        hideMiniCart: (state) => {
            state.showMiniCart = false
        },
        setQuantity: (state, action) => {
            const { id, quantity } = action.payload
            const index = state.cartItems.findIndex(x => x.id === id)
            if (index >= 0) {
                state.cartItems[index].quantity = quantity
            }
        },
        removeFromCart: (state, action) => {
            const idNeedRemove = action.payload
            state.cartItems =  state.cartItems.filter(x => x.id !== idNeedRemove)
        },
    }
})

// export const { showMiniCart, hideMiniCart } = actions;
export default cartSlice
