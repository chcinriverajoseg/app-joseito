// src/pages/ChatPage.jsx
import React from 'react';

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Sidebar de usuarios */}
      <aside className="w-64 bg-gray-900 p-4 text-white border-r border-gray-700">
        <h2 className="text-xl font-semibold mb-4">Matches</h2>
        <ul className="space-y-2">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Ariela 💖</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">María 💬</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Laura 🔥</li>
        </ul>
      </aside>

      {/* Área de chat */}
      <div className="flex-1 flex flex-col bg-gray-850 p-4">
        <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-300">
            <strong>Ariela:</strong> ¡Hola! ¿Cómo estás?
          </div>
          <div className="text-sm text-right text-gray-200">
            <strong>Tú:</strong> Muy bien, ¿y tú? 😊
          </div>
        </div>

        {/* Input de mensaje */}
        <form className="mt-4 flex">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-1 rounded-l-lg p-2 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 px-4 rounded-r-lg text-white"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
