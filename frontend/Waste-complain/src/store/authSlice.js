import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,    // true if logged in
  user: null,       // user info
  loading: true     // <--- new field: true while checking session
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.user = action.payload;
      state.loading = false; // stop loading after login
    },
    logout: (state) => {
      state.status = false;
      state.user = null;
      state.loading = false; // stop loading after logout
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
