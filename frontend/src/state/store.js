import { configureStore } from '@reduxjs/toolkit'
import demoReducer from './slices/demo';
export const store = configureStore({
  reducer: {
      demo: demoReducer,
  },
})