/*import React from 'react'
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
              <NavLink to="/" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>Home</NavLink>
              <NavLink to="/explore" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>Explorar</NavLink>
              <NavLink to="/matches" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>Matches</NavLink>
              <NavLink to="/chat" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>Chat</NavLink>
              <NavLink to="/perfil" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>{user?.name ?? 'Perfil'}</NavLink>
              <button onClick={handleLogout} className="ml-2 px-3 py-2 rounded-2xl bg-gray-900 text-white dark:bg-white dark:text-gray-900">Salir</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>Login</NavLink>
              <NavLink to="/register" className={({ isActive }) => `px-3 py-2 rounded-2xl ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-yellow-100 dark:hover:bg-gray-800'}`}>Registro</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
*/


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
    // CAMBIO AQUÍ: bg-slate-900 (Fondo) y border-slate-700 (Borde)
    <header className="sticky top-0 z-40 w-full border-b bg-cyan-500 border-b--700 text-cyan-50">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        <Link to="/" className="font-bold text-lg hover:text-blue-800 transition-colors">
          app-joseito
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          {isAuthenticated ? (
            <>
              {/* CAMBIO EN isActive: bg-blue-600 para resaltar el botón activo */}
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`
                }
              >
                Home
              </NavLink>

              <NavLink 
                to="/explore" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-yellow-600 text-white': 'hover:bg-yellow-800 text-slate-300'}`
                }
              >
                Explorar
              </NavLink>

              <NavLink 
                to="/matches" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-green-900 text-white' : 'hover:bg-green-400 text-slate-300'}`
                }
              >
                Matches
              </NavLink>

              <NavLink 
                to="/chat" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-purple-800 text-white' : 'hover:bg-purple-400 text-slate-300'}`
                }
              >
                Chat
              </NavLink>

              <NavLink 
                to="/perfil" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-rose-600 text-white' : 'hover:bg-rose-400 text-slate-300'}`
                }
              >
                {user?.name ?? 'Perfil'}
              </NavLink>

              <button 
                onClick={handleLogout} 
                className="ml-2 px-4 py-2 rounded-2xl bg-red-700 hover:bg-red-900 text-white font-medium transition-all"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-700 text-slate-300'}`
                }
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-2xl transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-400 text-slate-300'}`
                }
              >
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}








