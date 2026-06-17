import React from 'react'

export default function UserCard({ user, onLike }) {
  const initial = user?.name?.charAt(0).toUpperCase() ?? '?'

  return (
    <div style={{ background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      {user?.profileImage ? (
        <img
          src={user.profileImage}
          alt={user.name}
          style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(167,139,250,0.4)', marginBottom: '12px' }}
        />
      ) : (
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #db2777)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '500', color: 'white', marginBottom: '12px', border: '2px solid rgba(167,139,250,0.4)' }}>
          {initial}
        </div>
      )}

      <p style={{ fontSize: '15px', fontWeight: '500', color: '#e2e8f0', marginBottom: '4px' }}>{user?.name ?? 'Usuario'}</p>

      {user?.age && (
        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>{user.age} años {user.gender ? `· ${user.gender}` : ''}</p>
      )}

      {Array.isArray(user?.interests) && user.interests.length > 0 && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '12px' }}>
          {user.interests.slice(0, 3).map((i, idx) => (
            <span key={idx} style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', background: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: '0.5px solid rgba(139,92,246,0.3)' }}>
              {i}
            </span>
          ))}
        </div>
      )}

      <button
        onClick={() => onLike?.(user?._id)}
        style={{ width: '100%', padding: '8px', borderRadius: '20px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '13px', border: 'none', cursor: 'pointer', marginTop: 'auto' }}
      >
        💜 Like
      </button>
    </div>
  )
}