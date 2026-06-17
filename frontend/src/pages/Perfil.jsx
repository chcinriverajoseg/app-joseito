import React, { useEffect, useState } from 'react'
import { getProfileApi, updateProfileApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { useUser } from '@/context/useUser'

export default function Perfil() {
  const { user, setUser } = useUser()
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!user) return
    getProfileApi().then((u) => setForm({
      name: u.name || '',
      email: u.email || '',
      age: u.age || '',
      gender: u.gender || '',
      interests: Array.isArray(u.interests) ? u.interests.join(', ') : '',
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
    setSaving(true); setError(''); setSuccess(false)
    try {
      const payload = { ...form, interests: form.interests ? form.interests.split(',').map((s) => s.trim()) : [] }
      const updated = await updateProfileApi(payload)
      setUser(updated)
      setSuccess(true)
    } catch {
      setError('No se pudo guardar el perfil')
    } finally { setSaving(false) }
  }

  if (!form) return <Loader label="Cargando perfil..." />

  const inputStyle = { width: '100%', background: '#13131f', border: '0.5px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '10px 14px', color: '#e2e8f0', fontSize: '14px', outline: 'none' }
  const labelStyle = { fontSize: '12px', color: '#94a3b8', display: 'block', marginBottom: '6px' }

  const initial = form.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <section style={{ padding: '1.5rem 0', maxWidth: '500px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '2rem' }}>
        {form.profileImage ? (
          <img src={form.profileImage} alt={form.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(167,139,250,0.4)' }} />
        ) : (
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '500', color: 'white', border: '2px solid rgba(167,139,250,0.4)' }}>
            {initial}
          </div>
        )}
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#e2e8f0', margin: 0 }}>{form.name || 'Tu perfil'}</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{form.email}</p>
        </div>
      </div>

      <div style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '20px', padding: '1.5rem' }}>
        <ErrorMessage message={error} />
        {success && (
          <p style={{ fontSize: '13px', color: '#4ade80', marginBottom: '12px', background: 'rgba(74,222,128,0.1)', padding: '8px 12px', borderRadius: '8px' }}>
            ✓ Perfil guardado correctamente
          </p>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Nombre</label>
              <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Edad</label>
              <input name="age" type="number" value={form.age} onChange={handleChange} style={inputStyle} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>Género</label>
            <input name="gender" value={form.gender} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Intereses (separados por coma)</label>
            <input name="interests" value={form.interests} onChange={handleChange} placeholder="música, código, viajes" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Bio</label>
            <input name="bio" value={form.bio} onChange={handleChange} placeholder="Cuéntanos algo de ti" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>URL de imagen de perfil</label>
            <input name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="https://..." style={inputStyle} />
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{ width: '100%', padding: '12px', borderRadius: '12px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '14px', border: 'none', cursor: 'pointer', marginTop: '8px' }}
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </section>
  )
}