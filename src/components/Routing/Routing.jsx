import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Home/HomePage";
import ProductsPage from "../Products/ProductsPage";
import SingleProduct from "../SingleProduct/SingleProduct";
import CartPage from "../Cart/CartPage";
import MyOrderPage from "../MyOrder/MyOrderPage";
import LoginPage from "../Authentication/LoginPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import Logout from "../Authentication/Logout";
import ProtectedRoute from "./ProtectedRoute";
import LoginNeo from "../Authentication/LoginNeo";
import AdminHome from "../AdminHome/AdminHome";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LoginNeo />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/adminhome" element={<AdminHome />} />
      </Route>
    </Routes>
  );
};

export default Routing;
