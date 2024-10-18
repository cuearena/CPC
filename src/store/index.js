import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import userTempDataReducer from "../features/userTempDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userTempData: userTempDataReducer,
  },
});