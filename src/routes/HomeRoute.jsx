import { Route } from "react-router-dom";
import Auth from "../components/auth/Auth";
import Home from "../pages/home/Home";

const HomeRoute = [
  <Route
    key="home"
    path="/home"
    element={
      <Auth>
        <Home />
      </Auth>
    }
  />,
];

export default HomeRoute;
