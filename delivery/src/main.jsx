import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Restpck from "./Restpck";
import Droploc from "./Droploc";

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
        path: "/restpck",
        element: <Restpck />,
      },
      {
        path: "/droploc",
        element: <Droploc />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
