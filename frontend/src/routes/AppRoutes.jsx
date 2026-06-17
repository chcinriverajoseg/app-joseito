import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

import ExplorePage from "@/pages/ExplorePage";
import MatchesPage from "@/pages/MatchesPage";
import ChatPage from "@/pages/ChatPage";
import ChatRoom from "@/pages/ChatRoom";
import Perfil from "@/pages/Perfil";

import ProtectedRoute from "@/routes/ProtectedRoute";

const AppRoutes = () => (
  <Routes>
    {/* Públicas */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Privadas */}
    <Route
      path="/explore"
      element={
        <ProtectedRoute>
          <ExplorePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/matches"
      element={
        <ProtectedRoute>
          <MatchesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/perfil"
      element={
        <ProtectedRoute>
          <Perfil />
        </ProtectedRoute>
      }
    />
    <Route
      path="/chat"
      element={
        <ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/chat/:chatId"
      element={
        <ProtectedRoute>
          <ChatRoom />
        </ProtectedRoute>
      }
    />

    {/* Fallback */}
    <Route path="*" element={<div className="p-6">404 — Página no encontrada</div>} />
  </Routes>
);

export default AppRoutes;
