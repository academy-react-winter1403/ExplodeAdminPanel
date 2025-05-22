import { Mail, Home, Book, Circle } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "usersPage",
    title: "Mannage Users",
    icon: <Mail size={20} />,
    children: [
      {
        id: "userlist",
        title: "UsersList",
        icon: <Circle size={12} />,
        navLink: "/userslist",
      },
    ],
  },
  {
    id: "coursesPage",
    title: "مدیریت دوره ها",
    icon: <Book size={20} />,
    children: [
      {
        id: "coursesList",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: '/coursesList'
      },
    ],
  }
];
