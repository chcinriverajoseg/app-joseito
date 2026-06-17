import React, { useEffect, useState } from 'react'
import { getConversationsApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { Link } from 'react-router-dom'

export default function ChatPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getConversationsApi()
      .then(setItems)
      .catch(() => setError('No se pudo cargar tus chats'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader label="Cargando chats..." />

  return (
    <section style={{ padding: '1.5rem 0' }}>
      <h1 style={{ fontSize: '22px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Tus chats</h1>
      <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '1.5rem' }}>Conversaciones activas</p>
      <ErrorMessage message={error} />
      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          <p style={{ fontSize: '32px', marginBottom: '8px' }}>💬</p>
          <p>Aún no tienes conversaciones.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((c) => {
            const id = c.chatId || c.partnerId || c._id
            const initial = c.partner?.name?.charAt(0).toUpperCase() ?? '?'
            return (
              <div key={id} style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {c.partner?.profileImage ? (
                    <img src={c.partner.profileImage} alt={c.partner.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(167,139,250,0.4)' }} />
                  ) : (
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '500', color: 'white', border: '2px solid rgba(167,139,250,0.4)' }}>
                      {initial}
                    </div>
                  )}
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f0', margin: '0 0 2px' }}>{c.partner?.name ?? 'Usuario'}</p>
                    {c.lastMessage && <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{c.lastMessage.text}</p>}
                  </div>
                </div>
                <Link to={`/chat/${id}`} style={{ padding: '8px 16px', borderRadius: '20px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '13px', textDecoration: 'none' }}>
                  Abrir
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}