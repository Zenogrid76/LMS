// routes/StudentRoutes.jsx
import StudentRegister from "../components/pages/Registration/StudentReg/StudentRegister";
import StudentRegStep1 from "../components/pages/Registration/StudentReg/StudentRegStep1";
import StudentDashboard from "../components/pages/Dashboards/StudentDashboard";

export const studentRoutes = [
  { path: "/register/student", element: <StudentRegister /> },
  { path: "/register/student/step1", element: <StudentRegStep1 /> },
  { path: "/student/dashboard", element: <StudentDashboard /> },
];
