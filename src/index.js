import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App.js";
import { AdminAuthProvider } from "./admin/admin-auth.jsx";
import { AuthProvider } from "./login-process/loginauth.jsx";
import { CartProvider } from "./addtocart/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <AuthProvider>
      <AdminAuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </>
);

reportWebVitals();
