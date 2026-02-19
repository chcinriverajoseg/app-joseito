import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMessagesByChatIdApi, sendMessageByChatIdApi } from '@/api/auth'
import Loader from '@/components/Loader'
import ErrorMessage from '@/components/ErrorMessage'
import MessageBubble from '@/components/MessageBubble'
import Button from '@/components/Button'

export default function ChatRoom() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  const fetchMessages = async () => {
    try {
      const data = await getMessagesByChatIdApi(chatId)
      setMessages(data)
    } catch (e) {
      setError('No se pudieron cargar los mensajes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    const id = setInterval(fetchMessages, 3000)
    return () => clearInterval(id)
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
    } catch (e) {
      setError('No se pudo enviar el mensaje')
    }
  }

  if (loading) return <Loader label="Cargando conversación..." />

  return (
    <section className="flex h-[70vh] flex-col rounded-2xl border bg-white dark:bg-gray-800">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <MessageBubble key={m._id || m.createdAt} me={m.me} text={m.text || m.message} time={m.createdAt} />
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="border-t p-3 flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 rounded-2xl border px-3 py-2 bg-white/90 dark:bg-gray-900/60"
        />
        <Button type="submit">Enviar</Button>
      </form>
      {error && <div className="p-2"><ErrorMessage message={error} /></div>}
    </section>
  )
}
