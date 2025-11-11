import { createBrowserRouter } from "react-router";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayouts from "../Layouts/HomeLayouts";


const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayouts></HomeLayouts>
  },
  {
    path: '/auth/login',
    element: <Login></Login>
  },
  {
    path: '/auth/register',
    element: <Register></Register>
  },
  
]);

export default router;