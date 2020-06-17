import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { RenderTextField } from '../Field'
import { Link } from 'react-router-dom'
import { Card, Button } from '@material-ui/core'
import { signupLoginStyle, formStyle } from './styles'

const required = value => (value == null ? 'Required' : undefined)

const AdminLogin = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
  handleEmailChange,
  handlePasswordChange,
  auth
}) => {
  const style = signupLoginStyle

  return (
    <Card style={style.card}>
      <div>
        <h3 style={style.title}>Admin Login</h3>
        <form onSubmit={handleSubmit}>
          <Field
            name="email"
            component={RenderTextField}
            label="Email"
            validate={required}
            onChange={handleEmailChange}
            style={formStyle.input}
          />
          <Field
            name="password"
            type="password"
            component={RenderTextField}
            label="Password"
            validate={required}
            onChange={handlePasswordChange}
            style={formStyle.input}
          />
          {auth.fetching && <p style={style.loader}>Logging In...</p>}
          {auth.error && <p style={style.error}>ERROR: {auth.error.message}</p>}
          <Button
            type="submit"
            label="Login"
            disabled={pristine || submitting}
            variant='contained'
            color='primary'
            style={formStyle.input}
          > Login </Button>
        </form>
      </div>
    </Card>
  )
}

export default reduxForm({
  form: 'adminLogin'
})(AdminLogin)
