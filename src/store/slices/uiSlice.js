import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  theme: "light",
  notifications: [],
  loadingStates: {},
  modals: {},
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.push({ id: Date.now(), ...action.payload });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload,
      );
    },
    setLoading: (state, action) => {
      const { key, value } = action.payload;
      state.loadingStates[key] = value;
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  setTheme,
  addNotification,
  removeNotification,
  setLoading,
  openModal,
  closeModal,
} = uiSlice.actions;
export default uiSlice.reducer;
