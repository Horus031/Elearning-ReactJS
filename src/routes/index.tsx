import React from "react";
import { Route, type RouteObject, Navigate } from "react-router-dom";

const HomeTemplate = React.lazy(() => import("../pages/HomeTemplate"));
const HomePage = React.lazy(() => import("../pages/HomeTemplate/HomePage"));
const AuthTemplate = React.lazy(() => import("../pages/AuthTemplate"));
const LoginPage = React.lazy(() => import("../pages/AuthTemplate/LoginPage"));
const RegisterPage = React.lazy(
  () => import("../pages/AuthTemplate/RegisterPage")
);
const CourseCategoryPage = React.lazy(
  () => import("../pages/HomeTemplate/CourseCategoryPage")
);
const SearchPage = React.lazy(() => import("../pages/HomeTemplate/SearchPage"));
const CoursePage = React.lazy(() => import("../pages/HomeTemplate/CoursePage"));
const CourseDetailPage = React.lazy(
  () => import("../pages/HomeTemplate/CourseDetailPage")
);
const ConfirmationPage = React.lazy(
  () => import("../pages/HomeTemplate/ConfirmationPage")
);
const ProfilePage = React.lazy(
  () => import("../pages/HomeTemplate/ProfilePage")
);
const AdminTemplate = React.lazy(() => import("../layouts/AdminLayout"));

const UserManagementPage = React.lazy(
  () => import("../pages/AdminTemplate/UserManagement")
);

const CourseManagementPage = React.lazy(
  () => import("../pages/AdminTemplate/CourseManagement")
);

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  );
};
export const routes: RouteObject[] = [
  {
    path: "",
    element: withSuspense(HomeTemplate),
    children: [
      {
        index: true,
        element: <Navigate to="/TrangChu" replace />, // <-- redirect to /home
      },
      {
        path: "/TrangChu",
        element: withSuspense(HomePage),
      },
      {
        path: "/DanhMucKhoaHoc",
        element: withSuspense(CourseCategoryPage),
      },
      {
        path: "/TimKiemKhoaHoc",
        element: withSuspense(SearchPage),
      },
      {
        path: "/DanhSachKhoaHoc",
        element: withSuspense(CoursePage),
      },
      {
        path: "/ChiTietKhoaHoc/:maKhoaHoc",
        element: withSuspense(CourseDetailPage),
      },
      {
        path: "/XacNhanKhoaHoc/:maKhoaHoc",
        element: withSuspense(ConfirmationPage),
      },
      {
        path: "/HoSoNguoiDung",
        element: withSuspense(ProfilePage),
      },
    ],
  },
  {
    path: "/admin",
    element: withSuspense(AdminTemplate),
    children: [
      {
        path: "users",
        element: withSuspense(UserManagementPage),
      },
      {
        path: "courses",
        element: withSuspense(CourseManagementPage),
      },
    ],
  },

  {
    path: "/auth",
    element: withSuspense(AuthTemplate),
    children: [
      {
        path: "login",
        element: withSuspense(LoginPage),
      },

      {
        path: "register",
        element: withSuspense(RegisterPage),
      },
    ],
  },
];

export const generateRoutes = () => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element} />
  ));
};
