import { Mail, Home, Airplay, Circle } from "react-feather";

export default [
  {
    id: "home",
    title: "صفحه اصلی",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "usersPage",
    title: "مدیریت کاربران",
    icon: <Mail size={20} />,
    children: [
      {
        id: "userlist",
        title: "لیست کاربران",
        icon: <Circle size={12} />,
        navLink: "/userslist",
      },
    ],
  },
  {
    id: "calendar",
    title: "تقویم آموزشی",
    icon: <Home size={20} />,
    navLink: "/calendar",
  },
];
