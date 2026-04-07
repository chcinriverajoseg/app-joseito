import axios from 'axios'

const API = 'http://localhost:4000'

export const registerApi = async (data) => {
  const response = await axios.post(`${API}/api/users/register`, data)
  return response.data
}

export const loginApi = async (email, password) => {
  const response = await axios.post(`${API}/api/users/login`, {
    email,
    password,
  })
  return response.data
}

/* ===>COMENTARIO CAMBIO DE GETPROFILEAPI<====
export const getProfileApi = async (token) => {
  const response = await axios.get(`${API}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}*/

export const getProfileApi = async () => {
  const token = localStorage.getItem('token')

  const response = await axios.get(`${API}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const getMatchesApi = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API}/api/users/matches`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const getExploreUsersApi = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API}/api/users/explore`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}

export const likeUserApi = async (id) => {
  const token = localStorage.getItem('token')
  const res = await axios.post(`${API}/api/users/like/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const getConversationsApi = async () => {
  const token = localStorage.getItem('token')

  const res = await axios.get(`${API}/api/users/conversations`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return res.data
}


export const getMessagesByChatIdApi = async (chatId) => {
  const token = localStorage.getItem('token')
  const res = await axios.get(`${API}/api/users/messages/${chatId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const sendMessageByChatIdApi = async (chatId, text) => {
  const token = localStorage.getItem('token')
  const res = await axios.post(`${API}/api/users/messages/${chatId}`, { text }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}


export const updateProfileApi = async (data) => {
  const token = localStorage.getItem('token')

  const res = await axios.put(
    `${API}/api/users/me`,
    data,
    {
      headers: {
         Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}
