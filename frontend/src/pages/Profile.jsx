
// src/pages/Profile.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-black">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-pink-500 dark:text-pink-300 mb-6">
          Tu Perfil 💘
        </h2>

        <div className="flex flex-col items-center">
          <img
            src={user.avatar || 'https://i.pravatar.cc/150?u=' + user._id}
            alt="Avatar"
            className="w-28 h-28 rounded-full mb-4 border-4 border-pink-400 shadow-md"
          />

          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {user.name}, {user.age}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {user.email}
          </p>

          <p className="mt-4 text-center text-gray-700 dark:text-gray-300 italic">
            {user.bio || 'Sin descripción aún.'}
          </p>

          {user.interests?.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Intereses:
              </h4>
              <div className="flex flex-wrap gap-2 justify-center">
                {user.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-pink-100 dark:bg-pink-700 text-sm rounded-full text-pink-700 dark:text-white"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
        >
          Cerrar sesión
        </button>
      </div>
    </section>
  );
}
