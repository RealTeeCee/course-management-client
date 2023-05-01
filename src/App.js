import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoaderCom from "./components/common/LoaderCom.js";

const SignUpPage = lazy(() => import("./pages/auth/SignUpPage.js"));
const HomePage = lazy(() => import("./pages/HomePage.js"));


function App() {
  return (
    <Suspense fallback={<LoaderCom></LoaderCom>}>
      <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>


        {/* ********* Authentication ********* */}
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        {/* ********* END Authentication ********* */}
      </Routes>
    </Suspense>
  );
}

export default App;
