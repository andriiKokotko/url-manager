import React, { useState, createContext } from 'react'

interface Alert {
  open: boolean,
  message: string
}

export interface IAlertContext {
  alert: Alert,
  showAlert: (message: string) => void,
  hideAlert: () => void
}

export const AlertContext = createContext<IAlertContext | null>(null)

const initialState = { open: false, message: '' }

export const AlertContextProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState(initialState)

  const showAlert = (message: string) => setAlert({ open: true, message })
  const hideAlert = () => setAlert(initialState)

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      { children }
    </AlertContext.Provider>
  )
}
