
import { createContext, useContext, useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  async function fetchCurrentUser() {
    try {
      const response = await axiosInstance.get('/auth/user')
      const currentUser = response.data.data
      setUser(currentUser)
      return currentUser
    } catch (err) {
      localStorage.removeItem('token')
      setUser(null)
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function login(email, password) {
    const response = await axiosInstance.post('/auth/login', { email, password })
    const { access_token } = response.data.data

    localStorage.setItem('token', access_token)
    return await fetchCurrentUser()
  }

  async function refreshUser() {
    return await fetchCurrentUser()
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}