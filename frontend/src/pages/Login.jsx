import React, { useState } from 'react'
import { loginApi } from '@/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '@/context/useUser'
import ErrorMessage from '@/components/ErrorMessage'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const { token, user } = await loginApi(email, password)
      login(token, user)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Credenciales inválidas')
    } finally { setLoading(false) }
  }

  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '2rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Bienvenido</h1>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>Inicia sesión para continuar</p>
        <ErrorMessage message={error} />
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tu@email.com"
              style={{ width: '100%', background: '#13131f', border: '0.5px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', background: '#13131f', border: '0.5px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none' }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '14px', border: 'none', cursor: 'pointer', marginTop: '8px' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
          ¿Sin cuenta?{' '}
          <Link to="/register" style={{ color: '#a78bfa', textDecoration: 'none' }}>Regístrate</Link>
        </p>
      </div>
    </section>
  )
}