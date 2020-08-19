import React, { useContext } from 'react'
import { LoginForm } from '../components/forms/LoginForm'
import api from '../api/api'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const Login = () => {
  const history = useHistory()
  const {setCurrUser} = useContext(UserContext)

  const handleSubmit = async (values: any) => {
    const { email, password } = values
    try {
      const res = await api.login(email, password)
      await setCurrUser(res)
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

