import React from 'react'
import { Container, CircularProgress } from '@material-ui/core'

export const Spinner: React.FC = () => {

  return (
    <Container maxWidth="sm" style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      <CircularProgress />
    </Container>
  )
}
