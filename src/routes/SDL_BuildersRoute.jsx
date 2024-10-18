import { Route } from "react-router-dom";
import Auth from "../components/auth/Auth";
import SDL_Builders from "../pages/builders/SDL_Builders";

const SDL_BuildersRoute = [
  <Route
    key="sdlbuilders"
    path="/sdlbuilders"
    element={
      <Auth>
        <SDL_Builders/>
      </Auth>
    }
  />,
];

export default SDL_BuildersRoute;
