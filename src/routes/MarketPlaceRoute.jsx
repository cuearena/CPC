import { Route } from "react-router-dom";
import Auth from "../components/auth/Auth";
import MarketPlace from "../pages/marketPlace/MarketPlace";

const MarketPlaceRoute = [
  <Route
    key="marketplace"
    path="/marketplace"
    element={
      <Auth>
        <MarketPlace />
      </Auth>
    }
  />,
];

export default MarketPlaceRoute;
