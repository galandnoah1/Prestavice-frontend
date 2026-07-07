import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = ({ email, role = 'client' }) => {
    setUser({
      email,
      role,
      username: role === 'artisan' ? 'Jean-Paul Etoundi' : 'Client Prestavice',
      photo: 'https://placehold.co/200x200',
    })
  }

  const register = (data) => {
    setUser({
      email: data.email,
      role: data.role,
      username: data.username || data.nomProfessionnel,
      photo: 'https://placehold.co/200x200',
    })
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
