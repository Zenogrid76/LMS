import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/common/Header/Header";
import Footer from "./components/common/Footer/Footer";
import { AuthProvider } from "./components/pages/Auth/AuthContext";
import ProtectedRoute from "./components/common/Api/ProtectedRoute";
import { publicRoutes } from "./Routes/PublicRoutes";
import { mentorRoutes } from "./Routes/MentorRoutes";
import { studentRoutes } from "./Routes/StudentRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Public routes */}
          {publicRoutes.map(({ path, element }, idx) => (
            <Route key={idx} path={path} element={element} />
          ))}

          {/* Protected student routes */}
          <Route element={<ProtectedRoute />}>
            {studentRoutes.map(({ path, element }, idx) => (
              <Route key={idx} path={path} element={element} />
            ))}
          </Route>

          {/* Protected mentor routes */}
          <Route element={<ProtectedRoute />}>
            {mentorRoutes.map(({ path, element }, idx) => (
              <Route key={idx} path={path} element={element} />
            ))}
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
