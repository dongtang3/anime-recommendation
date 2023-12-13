import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import Dashboard from './Components/TopList/Dashboard';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';

import SearchAnime from './Components/TopList/SearchArea';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/Toplist" />} />
        <Route path="/" element={<Navigate to="/RegistrationForm" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/RegistrationForm" element={<RegistrationForm />} />

        <Route path="/SearchArea" element={<SearchAnime />} />

      </Routes>

    );
}

export default App;
