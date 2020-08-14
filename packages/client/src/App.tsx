import React, {useContext, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import api from './api/api'
import { Layout } from './containers/Layout'
import {UserContext} from './UserContext'
export const App = () => {
  const {setCurrUser} = useContext(UserContext)

  useEffect(() => {
    const checkToken = async () => {
      const user = await api.checkToken()
      setCurrUser(user)
    }
    checkToken()
  }, [])

  return (
    <Router>
      <Layout/>
    </Router>
  )
}

