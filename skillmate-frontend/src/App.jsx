// File: App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Portfolio from "./components/Portfolio";
import './styles.css';
import RequestSession from "./components/RequestSession";



const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/portfolio"
          element={token ? <Portfolio /> : <Navigate to="/login" />}
        />
        <Route
          path="/request-session"
          element={token ? <RequestSession /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
