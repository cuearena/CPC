import { BrowserRouter, Routes, Route } from "react-router-dom";

import Error404 from "../pages/error/Error404";
import ErrorRoutes from "./ErrorRoutes";
import AuthRoutes from "./AuthRoutes";
import dashboardRouters from "./DashboardRoutes";
import deployRouters from "./DeployRoutes";
import stackingRouters from "./Stacking";
import MarketPlace from "./MarketPlaceRoute";
import Sdl from "./SDL_BuildersRoute";
import Home from "./HomeRoute"
import Provider from "./Providers"


function MainRouters(){
    return(
        <BrowserRouter >
            <Routes>
                {AuthRoutes}
                {dashboardRouters}
                {deployRouters}
                {ErrorRoutes}
                {stackingRouters}
                {MarketPlace}
                {Sdl}
                {Home}
                {Provider}
                <Route path="*" element={<Error404 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouters;