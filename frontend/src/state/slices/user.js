import { createSlice } from '@reduxjs/toolkit'
import contract from '../../configurations/web3';
const initialState = {
  loading: true,
  isAuthenticated: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state) => {
      contract.methods.somFunc().send({ from: ....})
        .on('receipt', function () {
      });
state.loading = false;
state.isAuthenticated = true;
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