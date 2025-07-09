import MentorRegister from "../components/pages/Registration/MentorReg/MentorRegister";
import MentorApplicationStep1 from "../components/pages/Registration/MentorReg/MtRegStep1";
import MentorApplicationStep2 from "../components/pages/Registration/MentorReg/MtRegStep2";
import MentorApplicationStep3 from "../components/pages/Registration/MentorReg/MtRegStep3";
import MentorDashboard from "../components/pages/Dashboards/MentorDashboard";

export const mentorRoutes = [
  { path: "/register/mentor", element: <MentorRegister /> },
  { path: "/mentor/application/step1", element: <MentorApplicationStep1 /> },
  { path: "/mentor/application/step2", element: <MentorApplicationStep2 /> },
  { path: "/mentor/application/step3", element: <MentorApplicationStep3 /> },
  { path: "/mentor/dashboard", element: <MentorDashboard /> },
];