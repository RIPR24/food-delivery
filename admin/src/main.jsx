import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Orders from "./Orders";
import Home from "./home";
import Add from "./addstuf";
import Login from "./Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/addstuff",
        element: <Add />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
