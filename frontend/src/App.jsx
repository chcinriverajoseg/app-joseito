import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Matches from './pages/Matches';
import ChatPage from './pages/ChatPage';

export default function App() {
  return (
    //<BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </div>
    //</BrowserRouter>
  );
}
