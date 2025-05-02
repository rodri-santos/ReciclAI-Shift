import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrashClassifier from './pages/TrashClassifier';
import LandingPage from './pages/LandingPage';
import Recycling from './pages/Recycling';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/classify" element={<TrashClassifier />} />
        <Route path="/recycling" element={<Recycling />} />
      </Routes>
    </Router>
  );
}

export default App
