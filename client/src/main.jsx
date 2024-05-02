import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RegFormProvider from "./providers/RegFormProvider.jsx";
import Layout from "./containers/Layout.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SelectAddress from "./components/SelectAddress";
import SelectVehicle from "./components/SelectVehicle";
import SelectService from "./components/SelectService";
import SelectAddons from "./components/SelectAddons";
import SelectDateBooking from "./components/SelectDateBooking";
import AppointmentSummary from "./pages/AppointmentSummary";
import ServicesList from "./pages/ServiceList.jsx";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/address", element: <SelectAddress /> },
      { path: "/vehicle", element: <SelectVehicle /> },
      { path: "/services", element: <SelectService /> },
      { path: "/addons", element: <SelectAddons /> },
      { path: "/cart", element: <Cart /> },
      { path: "/date", element: <SelectDateBooking /> },
      { path: "/summary", element: <AppointmentSummary /> },
      { path: "/servicelist", element: <ServicesList /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router = {router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);
