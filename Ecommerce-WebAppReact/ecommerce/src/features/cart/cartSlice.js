import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("cart/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const addToCartAPI = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity = 1 }, { dispatch, rejectWithValue }) => {
    try {
      await api.post("cart/", {
        product_id: productId,
        quantity,
      });

      dispatch(fetchCart());
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }, { dispatch, rejectWithValue }) => {
    try {
      await api.put(`cart/${id}/`, {
        quantity,
      });

      dispatch(fetchCart());

      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`cart/${id}/`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCartItem.fulfilled, (state, action) => {
        const updated = action.payload;

        const index = state.items.findIndex(
          (item) => item.id === updated.id
        );

        if (index !== -1) {
          state.items[index] = updated;
        }
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default cartSlice.reducer;