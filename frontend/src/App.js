import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/Login';


function App() {
  return (

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    );
}

export default App;