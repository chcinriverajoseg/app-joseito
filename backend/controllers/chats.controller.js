
// controllers/chats.controller.js
import { v4 as uuid } from "uuid";

/**
 * Almacenamiento en memoria (demo).
 * En producción: define modelos Chat y Message en MongoDB.
 */
const chatsByUser = new Map();    // userId -> [{ _id, members:[me,other], peer, lastMessage }]
const messagesByChat = new Map(); // chatId -> [{ _id, text, author:{_id}, createdAt }]

const ensureUserChats = (userId) => {
  if (!chatsByUser.has(userId)) chatsByUser.set(userId, []);
  return chatsByUser.get(userId);
};
const ensureChatMessages = (chatId) => {
  if (!messagesByChat.has(chatId)) messagesByChat.set(chatId, []);
  return messagesByChat.get(chatId);
};
const mockUser = (id) => ({
  _id: id,
  name: `Usuario ${id.slice(-4)}`,
  username: `user_${id.slice(-4)}`,
  avatar: "",
});

// GET /api/chats
export const listMyChats = async (req, res) => {
  const me = req.user.id;
  const list = ensureUserChats(me);
  res.json(list);
};

// POST /api/chats/with/:userId
export const getOrCreateWith = async (req, res) => {
  const me = req.user.id;
  const other = req.params.userId;

  const myChats = ensureUserChats(me);
  const theirChats = ensureUserChats(other);

  let chat = myChats.find((c) => c.members.includes(other));
  if (!chat) {
    const chatId = uuid();
    chat = {
      _id: chatId,
      members: [me, other],
      peer: mockUser(other),
      lastMessage: null,
    };
    myChats.push(chat);
    theirChats.push({ ...chat, peer: mockUser(me) });
    ensureChatMessages(chatId);
  }

  res.json(chat);
};

// GET /api/chats/:chatId
// Devuelve cabecera del chat + mensajes para cuadrar con ChatRoom.jsx
export const getChat = async (req, res) => {
  const me = req.user.id;
  const { chatId } = req.params;

  const myChats = ensureUserChats(me);
  const chat = myChats.find((c) => c._id === chatId);
  if (!chat) return res.status(404).json({ message: "Chat no encontrado" });

  const raw = ensureChatMessages(chatId);
  const messages = raw.map((m) => ({
    ...m,
    fromSelf: m.author?._id === me,
  }));

  res.json({
    _id: chat._id,
    members: chat.members,
    peer: chat.peer,
    lastMessage: chat.lastMessage,
    messages,
  });
};

// GET /api/chats/:chatId/messages
export const listMessages = async (req, res) => {
  const me = req.user.id;
  const { chatId } = req.params;
  const raw = ensureChatMessages(chatId);
  const messages = raw.map((m) => ({
    ...m,
    fromSelf: m.author?._id === me,
  }));
  res.json(messages);
};

// POST /api/chats/:chatId/messages
export const sendMessage = async (req, res) => {
  const me = req.user.id;
  const { chatId } = req.params;
  const { text } = req.body || {};

  if (!text || !text.trim()) {
    return res.status(400).json({ message: "Texto requerido" });
  }

  // Crear y guardar mensaje
  const msg = {
    _id: uuid(),
    text: text.trim(),
    author: { _id: me },
    createdAt: new Date().toISOString(),
  };

  const msgs = ensureChatMessages(chatId);
  msgs.push(msg);

  // Actualizar lastMessage en ambos lados
  for (const [, chats] of chatsByUser.entries()) {
    const c = chats.find((x) => x._id === chatId);
    if (c) c.lastMessage = { text: msg.text, createdAt: msg.createdAt };
  }

  // Responder ya con fromSelf para el front
  res.status(201).json({ ...msg, fromSelf: true });
};
