import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Rest from "./Resturant";
import Orders from "./Orders";
import Buynow from "./Buynow";
import Trkordr from "./Trkordr";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/rest/:restid",
        element: <Rest />,
      },
      { path: "/orders", element: <Orders /> },
      { path: "/buynow", element: <Buynow /> },
      { path: "/trkordr", element: <Trkordr /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
