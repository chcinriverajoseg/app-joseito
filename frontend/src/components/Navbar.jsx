import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">App Joseito 💘</h1>

        <div className="space-x-4">
          <Link to="/" className="hover:text-indigo-400">Home</Link>
          <Link to="/matches" className="hover:text-indigo-400">Matches</Link>
          <Link to="/chat" className="hover:text-indigo-400">Chat</Link>
          <Link to="/profile" className="hover:text-indigo-400">Perfil</Link>
          <Link to="/login" className="hover:text-indigo-400">Login</Link>
          <Link to="/register" className="hover:text-indigo-400">Registro</Link>
        </div>
      </div>
    </nav>
  );
}
