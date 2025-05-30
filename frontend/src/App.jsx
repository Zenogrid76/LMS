import React from "react";
import { Routes, Route, BrowserRouter as Router  } from "react-router-dom";
import Home from "./components/pages/Home/Home"; // adjust path as needed
import Header from "./components/common/Header/Header"; // if you use Header here
import Footer from "./components/common/Footer/Footer"; // if you use Footer here

function App() {
  return (
    <>
      {/* If you want the header on every page, put it here */}
      <Header />
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
       </Router>
       <Footer />
    </>
  );
}

export default App;
