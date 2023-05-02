import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const SignUpPage = lazy(() => import("./pages/auth/SignUpPage.js"));
const SignInPage = lazy(() => import("./pages/auth/SignInPage.js"));

function App() {
  return (
    <Routes>
      <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
      <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
    </Routes>
  );
}

export default App;
