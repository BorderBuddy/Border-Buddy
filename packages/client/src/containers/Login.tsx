import React, { useContext, useState } from 'react'
import { LoginForm } from '../components/forms/LoginForm'
import api from '../api/api'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../UserContext'

export const Login = () => {
  const history = useHistory()
  const { setCurrUser } = useContext(UserContext)
  const [auth, setAuth] = useState({
    fetching: false,
    error: '',
  })

  const handleSubmit = async (values: any) => {
    const { email, password } = values
    try {
      setAuth({error: '', fetching: true})
      const res = await api.login(email, password)
      await setCurrUser(res)
      setAuth({...auth, fetching: false})
      history.push('/travelers')
    } catch (err) {
      setAuth({fetching: false, error: 'Login Not Successful'})
      console.error(err)
    }
  }

  return (
    <div>
      <LoginForm
        handleSubmit={ handleSubmit }
        auth={auth}
      />
    </div>
  )
}

