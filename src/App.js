import React, { lazy, Suspense } from "react";
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

const RegisterPage = lazy(() => import("./pages/auth/RegisterPage.js"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage.js"));
const ForgetPasswordPage = lazy(() =>
  import("./pages/auth/ForgetPasswordPage.js")
);
const ResetPasswordPage = lazy(() =>
  import("./pages/auth/ResetPasswordPage.js")
);

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

const AdminLessonListPage = lazy(() =>
  import("./pages/admin/lesson/AdminLessonListPage.js")
);

const AdminCreateLessonPage = lazy(() =>
  import("./pages/admin/lesson/AdminCreateLessonPage.js")
);

const HomePage = lazy(() => import("./pages/HomePage.js"));

const ErrorPage = lazy(() => import("./pages/errors/ErrorPage.js"));

const CategoryPage = lazy(() => import("./pages/category/CategoryPage.js"));
const CategoryDetailPage = lazy(() =>
  import("./pages/category/CategoryDetailPage.js")
);

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
const PaymentSuccessPage = lazy(() =>
  import("./pages/payment/PaymentSuccessPage.js")
);
const PaymentErrorPage = lazy(() =>
  import("./pages/payment/PaymentErrorPage.js")
);

Modal.setAppElement("#root");
Modal.defaultStyles = {};

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   //   dispatch(onCourseInitalState());
  //   // dispatch(onAuthInitalState());
  // }, [dispatch]);

  // useEffect(() => {
  //   axiosBearer
  //     .post("http://localhost:8080/momo", {
  //       userId: 1,
  //       courseId: 1,
  //       lang: "en",
  //       requestType: "payWithATM",
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       window.location.replace(res.data.payUrl);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // useEffect(() => {
  //   axiosBearer
  //     .post("http://localhost:8080/paypal/pay", {
  //       userId: 1,
  //       courseId: 1,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       window.location.replace(res.data.payUrl);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
          <Route
            path="/token-expire"
            element={
              <ErrorPage
                status={419}
                message="The verified link is expired. Please try again"
              ></ErrorPage>
            }
          ></Route>
          {/* ********* END Error ********* */}
          <Route
            path="/categories"
            element={<CategoryPage></CategoryPage>}
          ></Route>
          <Route
            path="/categories/:slug"
            element={<CategoryDetailPage></CategoryDetailPage>}
          ></Route>
          <Route path="/courses" element={<CoursePage></CoursePage>}></Route>
          <Route
            path="/courses/:slug"
            element={<CourseDetailPage></CourseDetailPage>}
          ></Route>
          <Route
            path="/my-courses"
            element={
              !user && !user?.email ? (
                <Navigate to="/login"></Navigate>
              ) : (
                <MyCoursePage></MyCoursePage>
              )
            }
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
            path="/payment/success"
            element={<PaymentSuccessPage></PaymentSuccessPage>}
          ></Route>
          <Route
            path="/payment/cancel"
            element={<PaymentErrorPage></PaymentErrorPage>}
          ></Route>

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
              // path="sections"
              path="courses/:courseId/sections"
              element={<AdminSectionListPage></AdminSectionListPage>}
            ></Route>
            <Route
              path="courses/:courseId/sections/create"
              element={<AdminCreateSectionPage></AdminCreateSectionPage>}
            ></Route>

            {/* Admin Lessons */}
            <Route
              path="courses/:courseId/sections/:sectionId/lessons"
              element={<AdminLessonListPage></AdminLessonListPage>}
            ></Route>
            <Route
              path="courses/:courseId/sections/:sectionId/lessons/create"
              element={<AdminCreateLessonPage></AdminCreateLessonPage>}
            ></Route>
          </Route>
          {/* ******* END ADMIN ******* */}
        </Route>

        {/* ********* Learn ********* */}
        <Route
          element={
            !user && !user?.email ? (
              <Navigate to="/login"></Navigate>
            ) : (
              <LayoutLearning></LayoutLearning>
            )
          }
        >
          {/* course slug */}
          <Route
            path="/learn/:slug"
            render
            element={<LearnPage></LearnPage>}
          ></Route>
        </Route>
        {/* ********* END Learn ********* */}

        {/* ********* Authentication ********* */}
        <Route element={<LayoutAuthentication></LayoutAuthentication>}>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route
            path="/forget-password"
            element={<ForgetPasswordPage></ForgetPasswordPage>}
          ></Route>
          <Route
            path="/reset-password"
            element={<ResetPasswordPage></ResetPasswordPage>}
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
