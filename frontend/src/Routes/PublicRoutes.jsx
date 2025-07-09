// routes/PublicRoutes.jsx
import Home from "../components/pages/Home/Home";
import Login from "../components/pages/Auth/Login";
import Register from "../components/pages/Registration/Register";
import MentorRegister from "../components/pages/Registration/MentorReg/MentorRegister";
import StudentRegister from "../components/pages/Registration/StudentReg/StudentRegister";



export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/register/mentor", element: <MentorRegister /> },
  { path: "/register/student", element: <StudentRegister /> },
  
];
