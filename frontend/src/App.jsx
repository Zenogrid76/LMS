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
       

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
