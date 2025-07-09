import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Registration/Register"; // Assuming this is the registration page
import StudentRegister from "./components/pages/Registration/StudentReg/StudentRegister";
import Courses from "./components/pages/Courses/Courses";
import Admin from "./components/pages/Admin/admin";
import MentorRegister from "./components/pages/Registration/MentorReg/MentorRegister";
import MentorApplicationStep1 from "./components/pages/Registration/MentorReg/MtRegStep1";
import MentorApplicationStep2 from "./components/pages/Registration/MentorReg/MtRegStep2";
import MentorApplicationStep3 from "./components/pages/Registration/MentorReg/MtRegStep3";
import MentorDashboard from "./components/pages/Dashboards/MentorDashboard"; // Assuming you have a Mentor Dashboard component
import { AuthProvider } from "./components/pages/Auth/AuthContext"; // Importing AuthProvider for authentication context

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />{" "}
          {/* Assuming Register is similar to Login */}
          <Route path="/register/student" element={<StudentRegister />} />{" "}
          {/* Redirect to Student Registration */}
          <Route path="/courses" element={<Courses />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/register/mentor" element={<MentorRegister />} />{" "}
          {/* Redirect to Mentor Registration */}
          <Route
            path="/mentor/application/step1"
            element={<MentorApplicationStep1 />}
          />{" "}
          {/* Mentor Application Step 1 */}
          <Route
            path="/mentor/application/step2"
            element={<MentorApplicationStep2 />}
          />{" "}
          {/* Mentor Application Step 2 */}
          <Route
            path="/mentor/application/step3"
            element={<MentorApplicationStep3 />}
          />{" "}
          {/* Mentor Application Step 3 */}
          <Route path="/mentor/dashboard" element={<MentorDashboard />} />{" "}
          {/* Mentor Dashboard */}
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
