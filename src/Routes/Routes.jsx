import { createBrowserRouter } from "react-router";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayouts from "../Layouts/HomeLayouts";
import Home from "../Pages/Home";
import AvailableFoods from "../Pages/AvailableFoods";
import AddFood from "../Pages/AddFood";
import FoodDetails from "../Pages/FoodDetails";
import ManageMyFoods from "../Pages/ManageMyFoods";
import MyFoodRequests from "../Pages/MyFoodRequests";
import ErrorPage from "../Pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayouts></HomeLayouts>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/available-foods",
        element: <AvailableFoods></AvailableFoods>,
      },
      {
        path: "/add-food",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/food-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <PrivateRoute>
            <MyFoodRequests></MyFoodRequests>
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/auth/login",
    element: <Login></Login>,
  },
  {
    path: "/auth/register",
    element: <Register></Register>,
  },

  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
