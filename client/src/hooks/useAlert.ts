import { useContext } from 'react'
import { AlertContext, IAlertContext } from '../context/AlertContext'

export const useAlert = () => {
  const { showAlert } = useContext(AlertContext) as IAlertContext

  return showAlert
}