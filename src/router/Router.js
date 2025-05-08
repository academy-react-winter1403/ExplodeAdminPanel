// ** Router imports
import { lazy } from "react";
import { useRoutes, Navigate, Outlet } from "react-router-dom";

// ** Layouts
import BlankLayout from "@layouts/BlankLayout";

// ** Hooks
import { useLayout } from "@hooks/useLayout";

// ** Utils
import { getUserData } from "../utility/Utils";

// ** GetRoutes
import { getRoutes } from "./routes";

// ** Components
const Login = lazy(() => import("../pages/Login"));

const Router = () => {
  const { layout } = useLayout();
  const allRoutes = getRoutes(layout);

  const AuthProtect = () => {
    const user = getUserData();

    if (!user || !user.roles) {
      return <Navigate to="/login" replace />;
    }

    if (user.roles.includes("Administrator")) {
      return <Outlet />;
    } else if (user.roles.includes("Student")) {
      return <Navigate to="/student" replace />;
    }

    return <Navigate to="/login" replace />;
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <AuthProtect />,
      children: [...allRoutes],
    },
    {
      path: "/login",
      element: <BlankLayout />,
      children: [{ index: true, element: <Login /> }],
    },
    {
      path: "*",
      element: <BlankLayout />,
      children: [{ index: true, element: <h1>404 - Not Found</h1> }],
    },
  ]);

  return routes;
};

export default Router;
