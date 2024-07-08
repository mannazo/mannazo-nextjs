'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ token })
    }
  }, [])

  const login = (token) => {
    localStorage.setItem('token', token)
    console.log(localStorage.getItem('token'))
    setUser(token)
  }

  const logout = () => {
    localStorage.removeItem('token')
    console.log(localStorage.getItem('token'))
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
