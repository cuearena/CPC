import { Route } from "react-router-dom";
import NoAuth from "../components/auth/NoAuth";
import Auth from "../components/auth/Auth";
import Stacking from "../pages/stacks/Stacking";

const stackingRouters = [
  <Route
    key="stack"
    path="/stack"
    element={
      <Auth>
        <Stacking />
      </Auth>
    }
  ></Route>,
];

export default stackingRouters;
