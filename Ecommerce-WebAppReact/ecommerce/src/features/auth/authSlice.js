import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* =========================
   REGISTER
========================= */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("accounts/register/", userData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* =========================
   LOGIN
========================= */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await api.post("auth/login/", userData);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* =========================
   FETCH PROFILE
========================= */
export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("accounts/profile/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* =========================
   UPDATE PROFILE (IMPORTANT 🔥)
========================= */
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.patch("accounts/profile/", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

/* =========================
   SLICE
========================= */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("access") || null,
    loading: false,
    error: null,
    success: false,
  },

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ================= REGISTER ================= */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= LOGIN ================= */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ================= PROFILE ================= */
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      /* ================= UPDATE PROFILE ================= */
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.success = true;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;