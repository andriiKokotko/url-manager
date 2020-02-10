import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Navbar } from './components/Navbar'
import { Alert } from './components/Alert'
import { AlertContextProvider } from './context/AlertContext'
import { AuthProvider } from './context/AuthContext'
import { Spinner } from './components/Spinner'

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        {(routes: JSX.Element, ready: boolean) => (
          <AlertContextProvider>
            <Navbar />
            <Alert />
            <Container maxWidth="md" style={{marginTop: '64px', paddingTop: '2rem'}}>
                {ready ? routes : <Spinner />}
            </Container>
          </AlertContextProvider>
        )}
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
