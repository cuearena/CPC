import { Route } from "react-router-dom";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";

import NoAuth from "../components/auth/NoAuth";

const AuthRouters = [
    <Route key="sign-up" path="/sign-up" element={
        <NoAuth>
            <Signup />
        </NoAuth>
    } />,
    <Route key="login" path="/login" element={
        <NoAuth>
            <Login />
        </NoAuth>
    } />
];

export default AuthRouters;