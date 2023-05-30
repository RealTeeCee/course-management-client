import React, { lazy, Suspense, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import LoaderCom from "./components/common/LoaderCom.js";
import { permissions } from "./constants/permissions.js";
import LayoutAuthentication from "./layouts/LayoutAuthentication.js";
import LayoutHome from "./layouts/LayoutHome.js";
import LayoutLearning from "./layouts/LayoutLearn.js";
import CheckAuthPage from "./pages/auth/CheckAuthPage.js";
import OAuth2RedirectPage from "./pages/auth/OAuth2RedirectPage.js";

import { onRefreshToken, onUpdateUserToken } from "./store/auth/authSlice.js";
import { getToken, removeToken } from "./utils/auth.js";

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.js"));

const AdminPage = lazy(() => import("./pages/admin/AdminPage.js"));
const AdminCourseListPage = lazy(() =>
  import("./pages/admin/course/AdminCourseListPage.js")
);
const AdminCreateCoursePage = lazy(() =>
  import("./pages/admin/course/AdminCreateCoursePage.js")
);
const AdminSectionListPage = lazy(() =>
  import("./pages/admin/section/AdminSectionListPage.js")
);
const AdminCreateSectionPage = lazy(() =>
  import("./pages/admin/section/AdminCreateSectionPage.js")
);

const AdminLessionListPage = lazy(() =>
  import("./pages/admin/lession/AdminLessionListPage.js")
);

const AdminCreateLessionPage = lazy(() =>
  import("./pages/admin/lession/AdminCreateLessionPage.js")
);

const HomePage = lazy(() => import("./pages/HomePage.js"));

const ErrorPage = lazy(() => import("./pages/errors/ErrorPage.js"));

const CoursePage = lazy(() => import("./pages/course/CoursePage.js"));
const MyCoursePage = lazy(() => import("./pages/course/MyCoursePage.js"));
const CourseDetailPage = lazy(() =>
  import("./pages/course/CourseDetailPage.js")
);

const CheckoutPage = lazy(() => import("./pages/checkout/CheckoutPage.js"));

const UserProfilePage = lazy(() => import("./pages/user/UserProfilePage.js"));

const BlogPage = lazy(() => import("./pages/blog/BlogPage.js"));
const BlogDetailsPage = lazy(() => import("./pages/blog/BlogDetailsPage.js"));

const LearnPage = lazy(() => import("./pages/learn/LearnPage.js"));

const customStyles = {
  content: {},
};

Modal.setAppElement("#root");
Modal.defaultStyles = {};

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Suspense fallback={<LoaderCom></LoaderCom>}>
      <Routes>
        <Route element={<LayoutHome></LayoutHome>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          {/* ********* Error ********* */}
          <Route
            path="*"
            element={<ErrorPage status={404}></ErrorPage>}
          ></Route>
          <Route
            path="/unauthorize"
            element={<ErrorPage status={401}></ErrorPage>}
          ></Route>
          <Route
            path="/forbidden"
            element={<ErrorPage status={403}></ErrorPage>}
          ></Route>
          {/* ********* END Error ********* */}
          <Route path="/courses" element={<CoursePage></CoursePage>}></Route>
          <Route
            path="/courses/:slug"
            element={<CourseDetailPage></CourseDetailPage>}
          ></Route>
          <Route
            path="/my-courses"
            element={<MyCoursePage></MyCoursePage>}
          ></Route>
          <Route
            path="/checkout/:slug"
            element={<CheckoutPage></CheckoutPage>}
          ></Route>

          <Route
            path="/profile/:slug"
            element={<UserProfilePage></UserProfilePage>}
          ></Route>

          <Route path="/blogs" element={<BlogPage></BlogPage>}></Route>
          <Route
            path="/blogs/:id"
            element={<BlogDetailsPage></BlogDetailsPage>}
          />

          <Route
            path="/oauth2/redirect"
            element={<OAuth2RedirectPage></OAuth2RedirectPage>}
          ></Route>
          {/* ********* ADMIN ********* */}
          <Route
            path="/admin"
            element={
              <CheckAuthPage
                allowPermissions={permissions.admin.ROLE}
              ></CheckAuthPage>
            }
          >
            <Route index element={<AdminPage></AdminPage>}></Route>
            {/* Admin Courses */}
            <Route
              path="courses"
              element={<AdminCourseListPage></AdminCourseListPage>}
            ></Route>
            <Route
              path="courses/create"
              element={<AdminCreateCoursePage></AdminCreateCoursePage>}
            ></Route>

            {/* Admin Sections */}
            <Route
              path="sections"
              element={<AdminSectionListPage></AdminSectionListPage>}
            ></Route>
            <Route
              path="sections/create"
              element={<AdminCreateSectionPage></AdminCreateSectionPage>}
            ></Route>

            {/* Admin Lessions */}
            <Route
              path="lessions"
              element={<AdminLessionListPage></AdminLessionListPage>}
            ></Route>
            <Route
              path="lessions/create"
              element={<AdminCreateLessionPage></AdminCreateLessionPage>}
            ></Route>
          </Route>
          {/* ******* END ADMIN ******* */}
        </Route>

        {/* ********* Learn ********* */}
        <Route element={<LayoutLearning></LayoutLearning>}>
          {/* course slug */}
          <Route path="/learn/:slug" element={<LearnPage></LearnPage>}></Route>
        </Route>
        {/* ********* END Learn ********* */}

        {/* ********* Authentication ********* */}
        <Route element={<LayoutAuthentication></LayoutAuthentication>}>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>

          <Route
            path="/login"
            render
            element={
              user && user.email ? (
                <Navigate to="/"></Navigate>
              ) : (
                <LoginPage></LoginPage>
              )
            }
          ></Route>
          <Route
            path="/logout"
            render
            element={<Navigate to="/"></Navigate>}
          ></Route>
        </Route>
        {/* ********* END Authentication ********* */}
      </Routes>
    </Suspense>
  );
}

export default App;
