import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-pink-600">
        💘 App-Joseito
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link to="/explore" className="text-gray-700 hover:text-pink-600">
              Explorar
            </Link>
            <Link to="/matches" className="text-gray-700 hover:text-pink-600">
              Matches
            </Link>
            <button onClick={logout} className="text-gray-700 hover:text-pink-600">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-pink-600">
              Iniciar sesión
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-pink-600">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
