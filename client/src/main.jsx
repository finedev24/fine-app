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
import AviabilityComponent from "./components/AviabilityComponent.jsx";
import DatePicker from "./components/DatePicker.jsx";
import PickerDate from './components/PickerDate.jsx'
import Cart from "./pages/Cart"
import Order from "./components/Order"
import Success from "./components/success.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/login", element: <Login /> },
      { path: "/booking", element: <Home /> },
      { path: "/booking/address", element: <SelectAddress /> },
      { path: "/booking/vehicle", element: <SelectVehicle /> },
      { path: "/booking/services", element: <SelectService /> },
      { path: "/booking/addons", element: <SelectAddons /> },
      { path: "/booking/cart", element: <Cart /> },
      { path: "/booking/date", element: <SelectDateBooking /> },
      { path: "/booking/summary", element: <AppointmentSummary /> },
      { path: "/booking/avilability", element: <AviabilityComponent /> },
      { path: "/booking/datepicker", element: <DatePicker /> },
      { path: "/booking/pickerdate", element: <PickerDate /> },
      { path: "/booking/order", element: <Order/> },
      { path: "/booking/success", element: <Success/> },
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
