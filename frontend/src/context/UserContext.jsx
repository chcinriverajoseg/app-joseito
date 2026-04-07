
/* eslint-disable */


import React, { createContext, useEffect, useMemo, useState } from 'react'
import { loginApi, registerApi, getProfileApi } from '@/api/auth'


export const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }
    getProfileApi()
      .then((u) => setUser(u))
      .catch(() => { localStorage.removeItem('token') })
      .finally(() => setLoading(false))
  }, [])

  const login = (token, u) => {
    localStorage.setItem('token', token)
    setUser(u)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const value = useMemo(() => ({
    user, setUser, login, logout, loading, isAuthenticated: !!user
  }), [user, loading])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
