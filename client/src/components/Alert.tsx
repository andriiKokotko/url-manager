import React, { useContext } from 'react'
import SnackBar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { AlertContext, IAlertContext } from '../context/AlertContext'

const transformMsg = (msg: string) => {
  return msg.split('').filter((el) => el !== '"').join('')
}

export const Alert: React.FC = () => {
  const { alert: { open, message }, hideAlert } = useContext(AlertContext) as IAlertContext

  return (
    <SnackBar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      autoHideDuration={3000}
      message={transformMsg(message)}
      open={open}
      action={
        <IconButton size="small" aria-label="close" color="inherit" onClick={hideAlert}>
          <CloseIcon fontSize="small" />
        </IconButton>
      }
      onClose={hideAlert}
    />
  )
}
