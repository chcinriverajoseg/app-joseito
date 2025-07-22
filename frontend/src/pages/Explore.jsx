import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const { user } = useContext(UserContext);
  const [profiles, setProfiles] = useState([]);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get('/api/users/explore', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfiles(res.data);
      } catch (err) {
        console.error('Error al cargar perfiles:', err);
      }
    };

    if (user?.token) fetchProfiles();
    else navigate('/login');
  }, [user, navigate]);

  const handleLike = async (id) => {
    try {
      await axios.post(`/api/users/like/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      alert('💖 Has dado like!');
      setCurrent((prev) => prev + 1);
    } catch (err) {
      console.error('Error al dar like:', err);
    }
  };

  const handleSkip = () => {
    setCurrent((prev) => prev + 1);
  };

  const currentProfile = profiles[current];

  if (!currentProfile) return <div className="p-4 text-center">🎉 ¡No hay más perfiles por explorar!</div>;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md w-96 text-center">
        <h2 className="text-xl font-bold mb-2">{currentProfile.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">{currentProfile.email}</p>
        <p className="text-sm mb-4">Intereses: {currentProfile.interests?.join(', ') || 'Ninguno'}</p>

        <div className="flex justify-around">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
            onClick={handleSkip}
          >
            ❌ Pasar
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
            onClick={() => handleLike(currentProfile._id)}
          >
            ❤️ Like
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
