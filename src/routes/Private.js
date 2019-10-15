import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Private = ({ component: Component }) => {
  const isAuthenticated = localStorage.getItem('auth')
  return (
    <Route
      render={() => {
        if (isAuthenticated) return <Component />

        return <Redirect to="/login" />
      }}
    />
  )
}

export default Private;