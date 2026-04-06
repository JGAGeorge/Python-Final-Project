import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "../features/cart/cartSlice";
import ordersReducer from "../features/orders/ordersSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: ordersReducer
  },
});