import React from "react";
import { Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRout from "./components/Protected/ProtectedRout";
const stripePromise = loadStripe(
  "pk_test_51RVAnFFKxtjSntJ2tR7Nx3gWniJYBOxvvGuya1MYkNHWJbkVdcbMNJjJRniSgmLGH63HRWYWXPjZ2A0jw876e7s300iGb0I4JW"
);

// console.log(stripePromise);

function Routing() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payments"
          element={
            <ProtectedRout
              msg={"you must log in to pay"}
              redirect={"/payments"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRout>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRout
              msg={"you must log in to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRout>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </HashRouter>
  );
}

export default Routing;
