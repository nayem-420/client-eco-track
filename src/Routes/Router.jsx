import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import AuthLayouts from "../Layouts/AuthLayouts";
import Registers from "../Pages/Auth/Registers";
import Login from "../Pages/Auth/Login";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import NotFound from "../Pages/Error/NotFound";
import Home from "../Pages/Home/Home";
import ChallengesForm from "../Pages/Challenges/ChallengesForm";
import ChallengeDetails from "../Pages/Challenges/ChallengeDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts></MainLayouts>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "challenge-form",
        element: <ChallengesForm></ChallengesForm>,
      },
      {
        path: "challenges/:id",
        element: <ChallengeDetails></ChallengeDetails>,
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
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
