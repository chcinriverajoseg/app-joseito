import React, { useEffect, useState } from 'react'
import { getMatchesApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { Link } from 'react-router-dom'

export default function MatchesPage() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getMatchesApi()
      .then(setMatches)
      .catch(() => setError('No se pudieron cargar los matches'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Cargando matches..." />

  return (
    <section style={{ padding: '1.5rem 0' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Tus Matches</h1>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>Conexiones mutuas</p>
      <ErrorMessage message={error} />
      {matches.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>💜</p>
          <p>Aún no tienes matches. ¡Explora y da likes!</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {matches.map((m) => {
            const id = m.chatId || m._id || m.partnerId
            const initial = m.name?.charAt(0).toUpperCase() ?? '?'
            return (
              <div key={id} style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {m.profileImage ? (
                    <img src={m.profileImage} alt={m.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(167,139,250,0.4)' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '500', color: 'white', border: '2px solid rgba(167,139,250,0.4)' }}>
                      {initial}
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f0', margin: 0 }}>{m.name}</p>
                    {m.bio && <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{m.bio}</p>}
                  </div>
                </div>
                <Link to={`/chat/${id}`} style={{ padding: '8px 16px', borderRadius: '20px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '13px', textDecoration: 'none' }}>
                  Chatear
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}