import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/auth/Login";
import Home from "../pages/Home";
import ConfirmPayment from "../pages/confirm-payment/ConfirmPayment";

function RouteSystem() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/confirm-payment"
        element={
          <PrivateRoute>
            <ConfirmPayment />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default RouteSystem;
