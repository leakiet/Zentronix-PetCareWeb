import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,
  totalItems: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItemIndex = state.cartItems.findIndex(item => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].quantity += newItem.quantity || 1
        state.cartItems[existingItemIndex].totalPrice =
          state.cartItems[existingItemIndex].price * state.cartItems[existingItemIndex].quantity
      } else {
        const cartItem = {
          ...newItem,
          cartId: Date.now() + Math.random(),
          quantity: newItem.quantity || 1,
          price: newItem.price || 0,
          totalPrice: (newItem.price || 0) * (newItem.quantity || 1)
        }
        state.cartItems.push(cartItem)
        state.totalItems += 1
      }

      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0)
      state.totalItems = Math.max(0, state.totalItems)
      toast.success('Added to cart successfully!')
    },

    updateCartItemQuantity: (state, action) => {
      const { cartId, quantity } = action.payload
      const itemIndex = state.cartItems.findIndex(item => item.cartId === cartId)

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          state.cartItems.splice(itemIndex, 1)
          state.totalItems -= 1
        } else {
          state.cartItems[itemIndex].quantity = quantity
          state.cartItems[itemIndex].totalPrice =
            state.cartItems[itemIndex].price * quantity
        }

        state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0)
        state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0)
        state.totalItems = Math.max(0, state.totalItems)
      }
    },

    removeFromCart: (state, action) => {
      const cartId = action.payload
      const initialLength = state.cartItems.length
      state.cartItems = state.cartItems.filter(item => item.cartId !== cartId)
      if (state.cartItems.length < initialLength) {
        state.totalItems -= 1
      }

      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0)
      state.totalPrice = state.cartItems.reduce((total, item) => total + item.totalPrice, 0)
      state.totalItems = Math.max(0, state.totalItems)

      toast.success('Product removed from cart')
    },

    clearCart: (state) => {
      state.cartItems = []
      state.totalQuantity = 0
      state.totalPrice = 0
      state.totalItems = 0
    }
  }
})

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalPrice = (state) => state.cart.totalPrice
export const selectCartTotalItems = (state) => state.cart.totalItems

export const {
  addToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions

export const cartReducer = cartSlice.reducer