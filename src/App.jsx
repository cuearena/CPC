import {BrowserRouter, useNavigate} from "react-router-dom";
import { useEffect } from 'react';

import './index.css';
import MainRoutes from './routes/MainRoutes';

function App() {
  return (
    <>
      <MainRoutes />
    </>
  )
}

export default App
