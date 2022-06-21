import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) : [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state , action) => {
        const item = action.payload;
        console.log("item" , item);
        const isItemExists = state.cartItems.find(
            (i) => i.pid === item.pid
        );
        if(isItemExists) {
            state.cartItems = state.cartItems.map((i) => i.pid === isItemExists.pid ? item : i)
        }else{
            state.cartItems = [...state.cartItems , item];
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItemFromCart: (state, action) => {
        const item = action.payload;
        console.log("at remove cart itms " , item);
        state.cartItems = state.cartItems.filter((i) => i.pid !== item.pid);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
        state.cartItems = [];
        localStorage.removeItem("cartItems");
    }
  }
})

// Action creators are generated for each case reducer function
export const { addItemToCart , removeItemFromCart , clearCart} = cartSlice.actions;

export default cartSlice.reducer