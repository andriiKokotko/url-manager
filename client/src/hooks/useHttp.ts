import { useContext, useState, useCallback, useEffect } from 'react'
import { useAlert } from './useAlert'
import { AuthContext, IAuthContext } from '../context/AuthContext'

export const useHttp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearError = () => setError(null)

  const showAlert = useAlert()

  const { token, isAuthenticated, logout } = useContext(AuthContext) as IAuthContext

  useEffect(() => {
    if (error === '"jwt expired"') {
      logout()
    }
    error && showAlert(error)
    clearError()
  }, [error, showAlert, logout])

  const request = useCallback(async (url: string, method = 'GET', body = null, headers = {}) => {
    if (body) {
      body = JSON.stringify(body)
      headers['Content-Type'] = 'application/json'
    }

    if (isAuthenticated) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const options = { method, headers, body }

    setLoading(true)

    return fetch(url, options)
      .then(res => {
        return res.json().then(data => {
          if (!res.ok) throw new Error(JSON.stringify(data.message))
          return data
        })
      })
      .then(data => {
        setLoading(false)
        return data
      })
      .catch(err => {
        setLoading(false)
        setError(err.message)
        throw err
      })

    //eslint-disable-next-line
    }, [])
    
  return { loading, request, error, clearError }
}