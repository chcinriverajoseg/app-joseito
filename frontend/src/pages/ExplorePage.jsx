import React, { useEffect, useState } from 'react'
import { getExploreUsersApi, likeUserApi } from '@/api/auth'
import Loader from '@/components/Loader'
import UserCard from '@/components/UserCard'
import ErrorMessage from '@/components/ErrorMessage'

export default function ExplorePage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getExploreUsersApi()
      .then(setUsers)
      .catch(() => setError('No se pudo cargar la lista'))
      .finally(() => setLoading(false))
  }, [])

  const handleLike = async (userId) => {
    try {
      await likeUserApi(userId)
      setUsers((prev) => prev.filter((u) => u._id !== userId))
    } catch (err) {
      setError('No se pudo enviar el like')
    }
  }

  if (loading) return <Loader label="Cargando perfiles..." />

  return (
    <section style={{ padding: '1.5rem 0' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Explorar</h1>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>Personas que podrían interesarte</p>
      <ErrorMessage message={error} />
      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>💜</p>
          <p>No hay más perfiles por ahora.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {users.map((u) => (
            <UserCard key={u._id} user={u} onLike={handleLike} />
          ))}
        </div>
      )}
    </section>
  )
}