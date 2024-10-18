import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { authState } from "../../features/authSlice";

function Auth({ children, ...rest }) {
    const auth = useSelector(authState);
    return (auth.auth !== "Y") ? <Navigate
        to={{
            pathname: "/login"
        }}
    /> : children;
}

export default Auth;