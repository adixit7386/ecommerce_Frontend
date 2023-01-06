import { createSlice } from "@reduxjs/toolkit";

const sideSlice = createSlice({
  name: "side",
  initialState: {
    sidebar: false,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar = !state.sidebar;
    },
  },
});

export const { toggleSidebar } = sideSlice.actions;

export default sideSlice.reducer;
