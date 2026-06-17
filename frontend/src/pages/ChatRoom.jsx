import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessagesByChatIdApi, sendMessageByChatIdApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import { io } from 'socket.io-client'

const socket = io('https://app-joseito-backend.onrender.com')

export default function ChatRoom() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    socket.emit('join_chat', chatId)
    getMessagesByChatIdApi(chatId)
      .then(setMessages)
      .catch(() => setError('No se pudieron cargar los mensajes'))
      .finally(() => setLoading(false))

    socket.on('new_message', (msg) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => { socket.off('new_message') }
  }, [chatId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    try {
      const msg = await sendMessageByChatIdApi(chatId, text.trim())
      setMessages((prev) => [...prev, msg])
      setText('')
    } catch {
      setError('No se pudo enviar el mensaje')
    }
  }

  if (loading) return <Loader label="Cargando conversación..." />

  return (
    <section style={{ display: 'flex', flexDirection: 'column', height: '75vh', background: '#1a1a2e', border: '0.5px solid rgba(139,92,246,0.2)', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((m) => (
          <div key={m._id || m.createdAt} style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: m.me ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.me ? 'linear-gradient(135deg, #7c3aed, #db2777)' : '#13131f', color: m.me ? 'white' : '#e2e8f0', fontSize: '14px', border: m.me ? 'none' : '0.5px solid rgba(139,92,246,0.2)' }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      {error && <div style={{ padding: '0 1rem' }}><ErrorMessage message={error} /></div>}
      <form onSubmit={sendMessage} style={{ borderTop: '0.5px solid rgba(139,92,246,0.2)', padding: '12px', display: 'flex', gap: '8px' }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{ flex: 1, background: '#13131f', border: '0.5px solid rgba(139,92,246,0.3)', borderRadius: '20px', padding: '10px 16px', color: '#e2e8f0', fontSize: '14px', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '10px 20px', borderRadius: '20px', background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: 'white', fontSize: '13px', border: 'none', cursor: 'pointer' }}>
          Enviar
        </button>
      </form>
    </section>
  )
}