import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Links from './pages/Links'
import Details from './pages/Details'
import CreateLink from './pages/CreateLink'
import Login from './pages/Login'
import Register from './pages/Register'

export const useRoutes = (isAuthenticated: boolean | null) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" component={Links} />
        <Route path="/details/:id" component={Details} />
        <Route path="/create-link" component={CreateLink} />
        <Redirect to='/links' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Redirect to="/" />
    </Switch>
  )
}