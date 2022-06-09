import { createSlice } from '@reduxjs/toolkit'
import contract from '../../configurations/web3';
const initialState = {
  loading: true,
  products: [],
}

export const prodcutsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state) => {
      contract.methods.getProducts().call().then((products) => {
        state.products = products;
        state.loading = false;
      });
      // state.user = data.address;
    },
decrement: (state) => {
  state.value -= 1
},
  incrementByAmount: (state, action) => {
    state.value += action.payload
  },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = demoSlice.actions

export default demoSlice.reducer