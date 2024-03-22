import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Main from "./pages/Main";
import Deposit from "./pages/Deposit";
import Withdraw from "./pages/Withdraw";
import Summary from "./pages/Summary";
import Login from "./pages/Login";
import CreateAccount from "./pages/Signin";
import ResetPassword from "./pages/ResetPassword";


export const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Main />} />
            <Route path="/deposit" element={<Deposit />} />
            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="/summary" element={<Summary />} />
          </Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createAccount" element={<CreateAccount/>}/>
          <Route path="/resetPassword" element={<ResetPassword/>}/>

        
    </>
  )
);
