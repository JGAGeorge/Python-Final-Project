import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get("products/");
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.products = action.payload; state.loading = false; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export default productSlice.reducer;