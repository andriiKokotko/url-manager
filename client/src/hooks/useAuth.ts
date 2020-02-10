import { useState, useCallback, useEffect } from 'react'

const authData = 'authData'

const initialState = { token: null, userId: null }

export const useAuth = () => {
  const [credentials, setCredentials] = useState(initialState)
  const [ready, setReady] = useState(false)

  const login = useCallback((token, userId) => {
    setCredentials({ token, userId })

    localStorage.setItem(authData, JSON.stringify({token, userId}))
  }, [])

  const logout = useCallback(() => {
    setCredentials(initialState)

    localStorage.removeItem(authData)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(authData) as string)
    
    if (data && data.token) {
      setCredentials(data)
    }

    setReady(true)
  }, [])

  return { login, logout, ready, ...credentials }
}