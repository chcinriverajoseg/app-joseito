import React, { useEffect, useState } from 'react'
import { getProfileApi, updateProfileApi } from '@/api/auth'
import Input from '@/components/Input'
import Button from '@/components/Button'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { useUser } from '@/context/useUser'

export default function Perfil() {
  const { user, setUser } = useUser()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return
    getProfileApi().then((u) => setForm({
      name: u.name || '',
      email: u.email || '',
      age: u.age || '',
      gender: u.gender || '',
      interests: Array.isArray(u.interests) ? u.interests.join(', ') : (u.interests || ''),
      bio: u.bio || '',
      profileImage: u.profileImage || '',
    }))
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true); setError('')
    try {
      const payload = { ...form, interests: form.interests ? form.interests.split(',').map((s) => s.trim()) : [] }
      const updated = await updateProfileApi(payload)
      setUser(updated)
    } catch (err) {
      setError('No se pudo guardar el perfil')
    } finally { setSaving(false) }
  }

  if (!form) return <Loader label="Cargando perfil..." />

  return (
    <section className="max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Tu perfil</h1>
      <ErrorMessage message={error} />
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <Input label="Nombre" name="name" value={form.name} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} disabled />
          <Input label="Edad" name="age" type="number" value={form.age} onChange={handleChange} />
          <Input label="Género" name="gender" value={form.gender} onChange={handleChange} />
        </div>
        <Input label="Intereses (coma-separado)" name="interests" value={form.interests} onChange={handleChange} />
        <Input label="Bio" name="bio" value={form.bio} onChange={handleChange} />
        <Input label="URL de imagen" name="profileImage" value={form.profileImage} onChange={handleChange} />
        <Button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</Button>
      </form>
    </section>
  )
}
