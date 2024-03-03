import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.scss";
import Root from "./Root.tsx";
import Login from "./pages/Login/Login.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import Admin from "./pages/admin/index.tsx";
import HomePage from "./pages/home/index.tsx";

import AuthLayout from "./layouts/Auth/AuthLayout.tsx";
import Lixi from "./pages/lixi/lixi.tsx";
import BestWishPage from "./pages/best-wish/index.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/admin" element={<Admin />} />
      <Route path="/lixi" element={<Lixi />} />
      <Route path="/chuc-tet" element={<BestWishPage />}/>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
