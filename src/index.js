import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import "./contact.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App.js";
import { AuthProvider } from "./admin/admin-auth.jsx";
import {UserAuthProvider} from "./login-process/loginauth.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <UserAuthProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </UserAuthProvider>
  </>
);

reportWebVitals();
