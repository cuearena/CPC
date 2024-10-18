import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {},  
};

const userTempDataSlice = createSlice({
  name: "userTempData",
  initialState,
  reducers: {
    setUserTempData: (state, action) => {
      state.userData = { ...state.userData, ...action.payload };
    },
    clearUserTempData: (state) => {
      state.userData = {};
    },
  },
});

export const { setUserTempData, clearUserTempData } = userTempDataSlice.actions;
export default userTempDataSlice.reducer;
