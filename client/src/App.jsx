import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RegisterPage from "./page/Register";
import HomePage from "./page/HomePage";
import LoginPage from "./page/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
