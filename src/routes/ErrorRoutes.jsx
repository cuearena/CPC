import { Route } from "react-router-dom";

import Error500 from "../pages/error/Error500";

const HomeRouters = [
    <Route key="500" path="/500" element={<Error500 />} />
];

export default HomeRouters;