import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      if (state.quantity > 0) {
        state.quantity -= 1;
      }
      for (let i = 0; i < state.products.length; i++) {
        if (
          state.products[i]._id === action.payload._id &&
          state.products[i].quantity === action.payload.quantity
        ) {
          state.products.splice(i, 1);
          break;
        }
      }
      state.total -= action.payload.price * action.payload.quantity;
    },
    emptyCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    updateCart: (state, action) => {},
  },
});

export const { addProduct, removeProduct, emptyCart, updateCart } =
  cartSlice.actions;
export default cartSlice.reducer;
