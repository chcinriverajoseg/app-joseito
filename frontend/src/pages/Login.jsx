import React, { useState } from 'react'
import { loginApi, registerApi } from '@/api/auth'

import { useNavigate, Link } from 'react-router-dom'
import Input from '@/components/Input'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import { useUser } from '@/context/useUser'

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
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Inicia sesión</h1>
      <ErrorMessage message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
      </form>
      <p className="text-sm">¿Sin cuenta? <Link to="/register" className="underline">Regístrate</Link></p>
    </section>
  )
}
