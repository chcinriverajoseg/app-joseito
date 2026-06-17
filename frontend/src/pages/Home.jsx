import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@/context/useUser'

export default function Home() {
  const { user, isAuthenticated } = useUser()

  return (
    <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '36px', fontWeight: '500', color: 'white', marginBottom: '12px' }}>
        Hola{user?.name ? `, ${user.name}` : ''} 👋
      </h1>
      <p style={{ fontSize: '16px', color: '#64748b', marginBottom: '2rem', maxWidth: '400px' }}>
        Explora personas, haz match y chatea en tiempo real.
      </p>

      {isAuthenticated ? (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/explore" style={{ padding: '10px 28px', borderRadius: '24px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '14px', textDecoration: 'none' }}>
            Explorar
          </Link>
          <Link to="/matches" style={{ padding: '10px 28px', borderRadius: '24px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', fontSize: '14px', border: '0.5px solid rgba(139,92,246,0.4)', textDecoration: 'none' }}>
            Mis matches
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link to="/register" style={{ padding: '10px 28px', borderRadius: '24px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '14px', textDecoration: 'none' }}>
            Crear cuenta
          </Link>
          <Link to="/login" style={{ padding: '10px 28px', borderRadius: '24px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', fontSize: '14px', border: '0.5px solid rgba(139,92,246,0.4)', textDecoration: 'none' }}>
            Iniciar sesión
          </Link>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '4rem', maxWidth: '600px' }}>
        <div style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Explora</p>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Descubre personas con tus intereses</p>
        </div>
        <div style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💜</div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Match</p>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Conecta cuando el like es mutuo</p>
        </div>
        <div style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '1.25rem' }}>
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>💬</div>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>Chatea</p>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Mensajes en tiempo real</p>
        </div>
      </div>
    </section>
  )
}