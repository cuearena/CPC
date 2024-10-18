import { Route } from "react-router-dom";

import Auth from "../components/auth/Auth";
import Deploy from "../pages/deploy/Deploy";
import CreateDeployment from "../pages/deploy/CreateDeployment";
const deployRouters = [
    <Route key="deploy" path="/deploy" element={
        <Auth>
            <Deploy />
        </Auth>
    } />,
    <Route key="CreateDeployment" path="/deploy/create" element={
        <Auth>
            <CreateDeployment />
        </Auth>
    } />
];

export default deployRouters;