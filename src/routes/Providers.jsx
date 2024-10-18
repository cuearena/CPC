import { Route } from "react-router-dom";
import Auth from "../components/auth/Auth";
import Providers from "../pages/providers/Providers"

const MarketPlaceRoute = [
  <Route
    key="providers"
    path="/providers"
    element={
      <Auth>
        <Providers />
      </Auth>
    }
  />,
];

export default MarketPlaceRoute;
