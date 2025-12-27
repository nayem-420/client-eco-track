import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts";
import Registers from "../Pages/Auth/Registers";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: "hi",
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayouts></AuthLayouts>,
    children: [
      {
        path: "register",
        element: <Registers></Registers>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "forget-password",
        element: <ForgetPassword></ForgetPassword>,
      },
    ],
  },
]);
