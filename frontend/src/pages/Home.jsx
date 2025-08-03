import React from "react";
import { useUser } from "@/context/UserContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-yellow-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Bienvenido a App-Joseito</h1>

      {user ? (
        <div className="text-center">
          <p className="text-xl mb-4">¡Hola, {user.name}! 💘</p>
          <Link
            to="/explore"
            className="px-6 py-3 bg-pink-600 text-white rounded-xl shadow-lg hover:bg-pink-700 transition"
          >
            Ir a explorar perfiles
          </Link>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <p className="text-lg">No estás logueado. ¡Únete ahora para encontrar tu match! 💞</p>
          <div className="flex space-x-4 justify-center">
            <Link
              to="/login"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
