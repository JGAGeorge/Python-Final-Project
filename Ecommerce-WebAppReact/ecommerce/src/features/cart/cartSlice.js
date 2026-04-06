import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const res = await api.get("cart/");
  return res.data;
});

export const addToCartAPI = createAsyncThunk("cart/addToCart", async (item) => {
  const res = await api.post("cart/add/", item);
  return res.data;
});

export const updateQuantityAPI = createAsyncThunk("cart/updateQuantity", async ({ id, quantity }) => {
  const res = await api.patch(`cart/${id}/`, { quantity });
  return res.data;
});

export const removeFromCartAPI = createAsyncThunk("cart/removeFromCart", async (id) => {
  await api.delete(`cart/${id}/`);
  return id;
});

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], loading: false },
  reducers: {
    clearCart: (state) => { state.cartItems = []; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => { state.cartItems = action.payload; })
      .addCase(addToCartAPI.fulfilled, (state, action) => { state.cartItems.push(action.payload); })
      .addCase(updateQuantityAPI.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(i => i.id === action.payload.id);
        if(index !== -1) state.cartItems[index] = action.payload;
      })
      .addCase(removeFromCartAPI.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      });
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;