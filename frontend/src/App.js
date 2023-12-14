import './App.css';
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Components/Login/Login';
import Dashboard from './Components/TopList/Dashboard';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';

import SearchAnime from './Components/TopList/SearchArea';
import RecommendationPage from "./Components/TopList/RecommendationPage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/RandomRecommendation" />} />

        <Route path="/RandomRecommendation" element={<RecommendationPage />} />
        <Route path="/SearchArea" element={<SearchAnime />} />

      </Routes>

    );
}

export default App;
