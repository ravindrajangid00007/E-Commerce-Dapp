import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user.js';
import cartReducer from './slices/cart.js';
export const store = configureStore({
  reducer: {
      user: userReducer,
      cart: cartReducer
  },
})