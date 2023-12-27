import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishListSlice from "./wishListSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
    wishList: wishListSlice,
  },
});
