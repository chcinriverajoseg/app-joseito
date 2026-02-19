import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useUser } from '@/context/useUser'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/60 dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-bold text-lg">app-joseito</Link>
        <nav className="flex items-center gap-2 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Home</NavLink>
              <NavLink to="/explore" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Explorar</NavLink>
              <NavLink to="/matches" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Matches</NavLink>
              <NavLink to="/chat" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Chat</NavLink>
              <NavLink to="/perfil" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>{user?.name ?? 'Perfil'}</NavLink>
              <button onClick={handleLogout} className="ml-2 px-3 py-2 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900">Salir</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Registro</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
