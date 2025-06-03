import { Mail, Map, Home, Book, Circle, FolderPlus } from "react-feather";

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
        id: "courseList",
        title: "لیست دوره ها",
        icon: <Circle size={12} />,
        navLink: '/coursesList',
      }
    ]
    ,
  },
  {
    id: "blogPage",
    title: "مدیریت بلاگ ها",
    icon: <Map size={20} />,
    children: [
      {
        id: "courseList",
        title: "لیست بلاگ ها",
        icon: <Circle size={12} />,
        navLink: '/blogList',
      },
      {
        id: "newCategory",
        title: "دسته بندی",
        icon: <Circle size={12} />,
        navLink: '/addNewCatgeory',
      },
    ]
  }
];
