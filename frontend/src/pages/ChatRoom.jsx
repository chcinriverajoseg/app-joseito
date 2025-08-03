import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '@/api/axios';
import { useUserContext } from '@/context/UserContext';

const ChatRoom = () => {
  const { id } = useParams(); // ID del match
  const { token, user } = useUserContext();
  const [messages, setMessages] = useState([]);
  const [matchInfo, setMatchInfo] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages);
      setMatchInfo(res.data.matchUser);
    } catch (error) {
      console.error('Error al cargar mensajes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(
        `/messages/${id}`,
        { text: newMessage },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, res.data]);
      setNewMessage('');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  if (loading) return <div className="p-4">Cargando conversación...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Chat con {matchInfo?.name || 'Usuario'}
      </h2>

      <div className="bg-white dark:bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto mb-4 border border-gray-300 dark:border-gray-700">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`mb-2 flex ${
              msg.sender === user._id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.sender === user._id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
