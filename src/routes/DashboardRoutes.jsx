import { Route } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import Auth from "../components/auth/Auth";

const dashboardRouters = [
    <Route key="dashboard" path="/" element={
        <Auth>
            <Dashboard />
        </Auth>
    } />,
    <Route key="dashboard-1" path="/dashboard" element={
        <Auth>
            <Dashboard />
        </Auth>
    } />
];

export default dashboardRouters;