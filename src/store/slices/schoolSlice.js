import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSchool: null,
  schools: [],
  isLoading: false,
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    setCurrentSchool: (state, action) => {
      state.currentSchool = action.payload;
    },
    setSchools: (state, action) => {
      state.schools = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentSchool, setSchools, setLoading } = schoolSlice.actions;
export default schoolSlice.reducer;
