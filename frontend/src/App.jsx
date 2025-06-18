import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Registration/Register"; // Assuming Register is similar to Login
import StudentRegister from "./components/pages/Auth/Registration/StudentRegister";
import Courses from "./components/pages/Courses/Courses";
import Admin from "./components/pages/Admin/admin";
import MentorSignupStepper from "./components/pages/Auth/Registration/Mentorregister/MentorSignupStepper";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Assuming Register is similar to Login */}
        <Route path="/register/student" element={<StudentRegister />} /> {/* Redirect to Student Registration */}
        <Route path="/courses" element={<Courses /> } />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register/mentor" element={<MentorSignupStepper />} /> {/* Mentor registration page */}

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
