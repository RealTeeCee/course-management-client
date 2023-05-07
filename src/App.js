import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoaderCom from "./components/common/LoaderCom.js";

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.js"));

const HomePage = lazy(() => import("./pages/HomePage.js"));
const CoursePage = lazy(() => import("./pages/CoursePage.js"));


function App() {
  return (
    <Suspense fallback={<LoaderCom></LoaderCom>}>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/courses" element={<CoursePage></CoursePage>}></Route>



        {/* ********* Authentication ********* */}
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        {/* ********* END Authentication ********* */}
      </Routes>
    </Suspense>
  );
}

export default App;
