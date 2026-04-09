// src/store/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  schoolId: localStorage.getItem("schoolId") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  permissions: JSON.parse(localStorage.getItem("permissions") || "[]"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, role, schoolId, permissions } = action.payload;
      state.user = user;
      state.token = token;
      state.role = role;
      state.schoolId = schoolId;
      state.permissions = permissions || [];
      state.isAuthenticated = true;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("schoolId", schoolId);
      localStorage.setItem("permissions", JSON.stringify(permissions || []));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.schoolId = null;
      state.permissions = [];
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("schoolId");
      localStorage.removeItem("permissions");
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
      localStorage.setItem("permissions", JSON.stringify(action.payload));
    },
  },
});

export const { setCredentials, logout, updateUser, setPermissions } =
  authSlice.actions;
export default authSlice.reducer;
