import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App.js";
import { AuthProvider } from "./admin/admin-auth.jsx";
import { UserAuthProvider } from "./login-process/loginauth.jsx";
import { CartProvider } from "./addtocart/CartContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <UserAuthProvider>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </UserAuthProvider>
  </>
);

reportWebVitals();
