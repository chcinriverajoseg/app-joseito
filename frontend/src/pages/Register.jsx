import React, { useState } from 'react'
import { registerApi } from '@/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import { useUser } from '@/context/useUser'
import ErrorMessage from '@/components/ErrorMessage'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: '', interests: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const payload = { ...form, interests: form.interests ? form.interests.split(',').map((s) => s.trim()) : [] }
      const { token, user } = await registerApi(payload)
      login(token, user)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al registrar')
    } finally { setLoading(false) }
  }

  const inputStyle = { width: '100%', background: '#13131f', border: '0.5px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none' }
  const labelStyle = { fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }

  return (
    <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 0' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '2rem' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Crear cuenta</h1>
        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>Únete a app-joseito</p>
        <ErrorMessage message={error} />
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Tu nombre" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="tu@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Contraseña</label>
            <input name="password" type="password" value={form.password} onChange={handleChange} required placeholder="••••••••" style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Edad</label>
              <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="25" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Género</label>
              <input name="gender" value={form.gender} onChange={handleChange} placeholder="Masculino" style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Intereses (separados por coma)</label>
            <input name="interests" value={form.interests} onChange={handleChange} placeholder="música, código, viajes" style={inputStyle} />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '14px', border: 'none', cursor: 'pointer', marginTop: '8px' }}
          >
            {loading ? 'Creando...' : 'Registrarme'}
          </button>
        </form>
        <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>Inicia sesión</Link>
        </p>
      </div>
    </section>
  )
}