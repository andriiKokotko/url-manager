import React, { createContext } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useRoutes } from '../routes'

export interface IAuthContext {
  token: string | null
  userId: string | null
  login: (token: string | null, userId: string | null) => void
  logout: () => void
  isAuthenticated: boolean
}

export const AuthContext = createContext<IAuthContext | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }}>
      { typeof children === 'function' ? children(routes, ready) : children }
    </AuthContext.Provider>
  )
}