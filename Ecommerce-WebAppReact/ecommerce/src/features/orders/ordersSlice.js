import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("orders/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

export const placeOrderAPI = createAsyncThunk(
  "orders/placeOrder",
  async (order, { rejectWithValue }) => {
    try {
      const res = await api.post("orders/add/", order);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to place order");
    }
  }
);

export const updateOrderStatusAPI = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`orders/${id}/`, { status });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update order status");
    }
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      .addCase(placeOrderAPI.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      
      .addCase(updateOrderStatusAPI.fulfilled, (state, action) => {
        const index = state.orders.findIndex(o => o.id === action.payload.id);
        if (index !== -1) state.orders[index] = action.payload;
      });
  },
});

export default ordersSlice.reducer;