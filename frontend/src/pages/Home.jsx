// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-200 via-red-100 to-yellow-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-black transition-colors">
      <div className="text-center max-w-xl p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 dark:text-pink-300 mb-6">
          Bienvenido a Joséito 💘
        </h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Conoce personas afines a ti, encuentra matches, chatea y conecta con quienes comparten tus intereses.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition">
            Regístrate
          </Link>
          <Link to="/login" className="px-6 py-3 rounded-full border border-pink-500 text-pink-500 font-semibold hover:bg-pink-50 dark:hover:bg-zinc-700 transition">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </section>
  );
}
