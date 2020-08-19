import React from 'react'
import { LoginForm } from '../components/forms/LoginForm'
import api from '../api/api'
import { useHistory } from 'react-router-dom'

export const Login = () => {
  const history = useHistory()

  const handleSubmit = async (values: any) => {
    const { email, password } = values
    try {
      await api.login(email, password)
      history.push('/travelers')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <LoginForm
        handleSubmit={handleSubmit}
      />
    </div>
  )
}

