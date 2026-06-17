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
    <header className="sticky top-0 z-40 w-full" style={{ background: '#13131f', borderBottom: '0.5px solid rgba(139,92,246,0.3)' }}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        <Link to="/" style={{ background: 'linear-gradient(135deg, #a78bfa, #f472b6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '18px', fontWeight: '500' }}>
          app-joseito
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          {isAuthenticated ? (
            <>
              <NavLink to="/" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                Home
              </NavLink>
              <NavLink to="/explore" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                Explorar
              </NavLink>
              <NavLink to="/matches" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                Matches
              </NavLink>
              <NavLink to="/chat" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                Chat
              </NavLink>
              <NavLink to="/perfil" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                {user?.name ?? 'Perfil'}
              </NavLink>
              <button onClick={handleLogout} className="ml-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '0.5px solid rgba(239,68,68,0.3)' }}>
                Salir
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) =>
                `px-3 py-2 rounded-full transition-all text-sm ${isActive ? 'text-white' : 'text-slate-400 hover:text-purple-300'}`
              } style={({ isActive }) => isActive ? { background: 'linear-gradient(135deg, #7c3aed, #db2777)' } : {}}>
                Registro
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}