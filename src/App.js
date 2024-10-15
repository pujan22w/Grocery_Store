import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import Home from "./home.js";
import About from "./about.jsx";
import ContactUs from "./contact.js";
import Product from "./product.jsx";
import { Login } from "./login-process/login.jsx";
import SignUpForm from "./login-process/signin.jsx";
import { ForgotPassword } from "./login-process/forgotpassword.jsx";
import { ItemsProducts } from "./items-description.jsx";
import AdminLog from "./admin/admin-login.jsx";
import ProtectedRoute from "./admin/panel-protect.jsx";
import { AuthContext } from "./admin/admin-auth.jsx";
// FOr admin Panel
import AppAdminComponent from "./adminPanel/AppComponent.jsx";
import AddToCart from "./addtocart/AddtoCart.js";
function App() {
  const { isAuth } = useContext(AuthContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="contact" element={<ContactUs />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="signup" element={<SignUpForm />}></Route>
          <Route path="forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="apple" element={<ItemsProducts />}></Route>
          <Route path="/admin/login" element={<AdminLog />}></Route>
          <Route path="/cart" element={<AddToCart />}></Route>
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <AppAdminComponent />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
