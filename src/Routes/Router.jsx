import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";

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
]);
