import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOldUser : false,
  userType: 'buyer',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOldUserTrue: (state) => {
      state.isOldUser = true
    },
    setOldUserFalse: (state) => {
      state.isOldUser = false;
    },
    setUserTypeSeller: (state) => {
      state.userType = 'seller';
    },
    setUserTypeBuyer: (state) => {
      state.userType = 'buyer';
    },
    setUserTypeEmpty: (state) => {
      state.userType = '';
    }
  },
})

// Action creators are generated for each case reducer function
export const { setOldUserTrue , setOldUserFalse , setUserTypeSeller , setUserTypeEmpty , setUserTypeBuyer} = userSlice.actions;

export default userSlice.reducer