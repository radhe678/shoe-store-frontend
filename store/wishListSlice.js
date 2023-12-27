// wishListSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishListItems: [],
  },
  reducers: {
    addToWishList: (state, action) => {
        const item = state.wishListItems.find((p) => p.id === action.payload.id);
        if (item) {
          item.quantity++;
          item.attributes.price = item.oneQuantityPrice * item.quantity;
        } else {
          state.wishListItems.push({ ...action.payload, quantity: 1 });
        }
    },
    updateWishList: (state, action) => {
        state.wishListItems = state.wishListItems.map((p) => {
          if (p.id === action.payload.id) {
            if (action.payload.key === "quantity") {
              p.attributes.price = p.oneQuantityPrice * action.payload.val;
            }
            return { ...p, [action.payload.key]: action.payload.val };
          }
          return p;
        });
      },
    removeFromWishList: (state, action) => {
      state.wishListItems = state.wishListItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

export const { addToWishList, updateWishList, removeFromWishList } = wishListSlice.actions;

export default wishListSlice.reducer;
