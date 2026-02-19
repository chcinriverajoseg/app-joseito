import React, { useState } from 'react'
import { registerApi } from '@/api/auth'
import { useNavigate, Link } from 'react-router-dom'
import Input from '@/components/Input'
import Button from '@/components/Button'
import ErrorMessage from '@/components/ErrorMessage'
import { useUser } from '@/context/useUser'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useUser()
  const [form, setForm] = useState({
    name: '', email: '', password: '', age: '', gender: '', interests: '', bio: '', profileImage: ''
  })
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

  return (
    <section className="max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Crear cuenta</h1>
      <ErrorMessage message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input label="Nombre" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Edad" name="age" type="number" value={form.age} onChange={handleChange} />
          <Input label="Género" name="gender" value={form.gender} onChange={handleChange} />
        </div>
        <Input label="Intereses (coma-separado)" name="interests" value={form.interests} onChange={handleChange} />
        <Input label="Bio" name="bio" value={form.bio} onChange={handleChange} />
        <Input label="URL de imagen" name="profileImage" value={form.profileImage} onChange={handleChange} />
        <Button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Registrarme'}</Button>
      </form>
      <p className="text-sm">¿Ya tienes cuenta? <Link to="/login" className="underline">Inicia sesión</Link></p>
    </section>
  )
}
