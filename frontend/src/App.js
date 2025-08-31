import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SignUp from './components/Signup';
import LegalAidPage from './components/LegalAidPage';
import ProfilePage from './components/Profile';
import ChatBot from './components/ChatBot';
import ProtectedData from './components/ProtectedData';
// import HealthCheck from './components/HealthCheck'; // keep if you want a /health route

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Protecteddata" element={<ProtectedData />} />
        <Route path="/chat" element={<ChatBot />} />
        {/* Uncomment if you want a health check route */}
        {/* <Route path="/health" element={<HealthCheck />} /> */}
        <Route path="/legalaid" element={<LegalAidPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}