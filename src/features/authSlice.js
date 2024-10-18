import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    'auth': localStorage.getItem("auth") ?? "N",
    'email': localStorage.getItem("email") ?? ""
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSession: (state, action) => {
            state.auth = action.payload.auth;
            state.email = action.payload.email;
        }
    }
});

export const authState = (state) => state.auth;

export const { setSession } = authSlice.actions;

export default authSlice.reducer;