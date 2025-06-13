import { Fragment, lazy, memo } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import UserView from "../../components/UserPage/UsersDetailsPage";
import CalendarComponent from "../../pages/Calendar";

// ** Memoized Layouts
const MemoizedBlankLayout = memo(BlankLayout);
const MemoizedVerticalLayout = memo(VerticalLayout);
const MemoizedHorizontalLayout = memo(HorizontalLayout);

const getLayout = {
  blank: <MemoizedBlankLayout />,
  vertical: <MemoizedVerticalLayout />,
  horizontal: <MemoizedHorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const UsersList = lazy(() => import("../../pages/UsersList"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
const UsersDetails = lazy(() => import("../../pages/UsersDetails"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/userslist",
    element: <UsersList />,
  },
  {
    path: "/userdetail/:id",
    element: <UserView />,
  },
  {
    path: "/calendar",
    element: <CalendarComponent />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: { layout: "blank" },
  },
  {
    path: "/register",
    element: <Register />,
    meta: { layout: "blank" },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: { layout: "blank" },
  },
  {
    path: "/error",
    element: <Error />,
    meta: { layout: "blank" },
  },
  {
    path: "*",
    element: <Error />,
    meta: { layout: "blank" },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    }
    return {};
  }
};

const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  Routes.forEach((route) => {
    let isBlank = false;
    if (
      (route.meta && route.meta.layout && route.meta.layout === layout) ||
      ((route.meta === undefined || route.meta.layout === undefined) &&
        defaultLayout === layout)
    ) {
      const RouteTag = PublicRoute;

      if (route.meta) {
        isBlank = route.meta.layout === "blank";
      }
      if (route.element) {
        const Wrapper = isBlank ? Fragment : LayoutWrapper;
        route.element = (
          <Wrapper {...(isBlank ? {} : getRouteMeta(route))}>
            <RouteTag route={route}>{route.element}</RouteTag>
          </Wrapper>
        );
      }

      LayoutRoutes.push({ ...route }); // Create new object to avoid mutating original
    }
  });

  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];
  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);
    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export {
  DefaultRoute,
  TemplateTitle,
  Routes,
  getRoutes,
  MemoizedVerticalLayout,
  MemoizedHorizontalLayout,
  MemoizedBlankLayout,
};
