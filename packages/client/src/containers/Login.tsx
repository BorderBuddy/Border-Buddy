import React from 'react'
import { connect } from 'react-redux'
import { LoginForm } from '../components/LoginForm'
import { loginRequest, loginSuccess, loginFailure } from '../actions/auth'
import api from '../api/api'
import { useHistory } from 'react-router-dom'

const Login = (props:any) => {
  const history = useHistory()

  const handleSubmit = async (values: any) => {
    const { email, password } = values
    props.loginRequest()
    try {
      const res = await api.login(email, password)
      props.loginSuccess(res)
      history.push('/travelers')
    } catch (err) {
      props.loginFailure(err.message)
      console.error(err)
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
  loginRequest: () => dispatch(loginRequest()),
  loginSuccess: () => dispatch(loginSuccess()),
  loginFailure: (message: any) => dispatch(loginFailure(message)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
