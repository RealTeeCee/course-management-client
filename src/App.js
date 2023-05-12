import React, { lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoaderCom from "./components/common/LoaderCom.js";
import OAuth2RedirectPage from "./pages/auth/OAuth2RedirectPage.js";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./store/user/action.js";
import { selectLoginIsSuccess } from "./store/login/selector.js";

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.js"));

const HomePage = lazy(() => import("./pages/HomePage.js"));
const CoursePage = lazy(() => import("./pages/CoursePage.js"));

const ErrorPage = lazy(() => import("./pages/ErrorPage.js"));

function App() {
  const dispatch = useDispatch();
  const selectLoginSuccess = useSelector(selectLoginIsSuccess);

  // useEffect(() => {
  //   //If cannot refresh token => nagivate to /login
  //   console.log("selectLoginSuccess", selectLoginSuccess);
  //   if (!selectLoginSuccess) {
  //     navigate("/login");
  //   }
  // }, [navigate, selectLoginSuccess]);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Suspense fallback={<LoaderCom></LoaderCom>}>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/courses" element={<CoursePage></CoursePage>}></Route>

        {/* ********* Error ********* */}
        <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        {/* ********* END Error ********* */}

        {/* ********* Authentication ********* */}
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route
          path="/login"
          render
          element={
            selectLoginSuccess ? (
              <Navigate to="/"></Navigate>
            ) : (
              <LoginPage></LoginPage>
            )
          }
        ></Route>
        <Route
          path="/oauth2/redirect"
          element={<OAuth2RedirectPage></OAuth2RedirectPage>}
        ></Route>
        {/* ********* END Authentication ********* */}
      </Routes>
    </Suspense>
  );
}

export default App;
