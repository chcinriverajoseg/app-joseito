import api from './axios'

export async function loginApi(email, password) {
  const { data } = await api.post('/auth/login', { email, password })
  return data
}

export async function registerApi(payload) {
  const { data } = await api.post('/auth/register', payload)
  return data
}

export async function getProfileApi() {
  const { data } = await api.get('/users/me')
  return data
}

export async function updateProfileApi(payload) {
  const { data } = await api.put('/users/me', payload)
  return data
}

export async function getExploreUsersApi() {
  const { data } = await api.get('/users/explore')
  return data
}

export async function likeUserApi(targetUserId) {
  const { data } = await api.post(`/users/${targetUserId}/like`)
  return data
}

export async function getMatchesApi() {
  const { data } = await api.get('/users/matches')
  return data
}

export async function getConversationsApi() {
  const { data } = await api.get('/chats')
  return data
}

export async function getMessagesByChatIdApi(chatId) {
  const { data } = await api.get(`/chats/${chatId}`)
  return data
}

export async function sendMessageByChatIdApi(chatId, message) {
  const { data } = await api.post(`/chats/${chatId}`, { message })
  return data
}
