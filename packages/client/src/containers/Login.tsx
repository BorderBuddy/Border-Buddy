import React from 'react'
import { connect } from 'react-redux'
import { LoginForm } from '../components/LoginForm'
import { login } from '../actions/auth'
import api from '../api/api'
import { useHistory } from 'react-router-dom'

const Login = (props:any) => {
  const history = useHistory()

  const handleSubmit = async (values: any) => {
    const { email, password } = values
    try {
      const res = await api.login(email, password)
      props.login(res)
      history.push('/travelers')
    } catch (err) {
      console.error('ERROR!', err)
    }
  }

  return (
    <div>
      <LoginForm
        handleSubmit={handleSubmit}
        auth={props.auth}
      />
    </div>
  )
}

/* ---------------------------REDUX CONTAINER--------------------------- */

const mapStateToProps = ({ auth }: any) => ({ auth })

const mapDispatchToProps = (dispatch: any) => ({
  login: (response: any) => dispatch(login(response))
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
