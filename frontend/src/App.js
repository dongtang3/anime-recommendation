import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import Dashboard from './Components/TopList/Dashboard';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/Toplist" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>

    );
}

export default App;
