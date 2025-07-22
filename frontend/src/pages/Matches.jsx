// src/pages/Matches.jsx
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from '../api/axios';

export default function Matches() {
  const { user } = useContext(UserContext);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/users/matches', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(res.data.matches);
      } catch (err) {
        console.error('Error cargando matches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Cargando matches...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-black p-6">
      <h2 className="text-3xl font-bold text-center text-pink-500 dark:text-pink-300 mb-8">
        💞 Tus Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Aún no tienes matches. ¡Sigue dando likes! 😉
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {matches.map((match) => (
            <div
              key={match._id}
              className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow-md flex flex-col items-center text-center"
            >
              <img
                src={match.avatar || `https://i.pravatar.cc/150?u=${match._id}`}
                alt={match.name}
                className="w-24 h-24 rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {match.name}, {match.age}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {match.bio || 'Sin descripción'}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {match.interests?.map((i, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-pink-200 dark:bg-pink-600 text-pink-800 dark:text-white px-2 py-1 rounded-full"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
