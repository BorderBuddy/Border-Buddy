import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { RenderTextField } from '../Field'
import { Card, Button, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { adminSignUp } from './styles'
import { minimumLength, required, phone } from '../../utils/validations'

class AdminSignUp extends Component {
  render () {
    const style = adminSignUp
    const {
      handleSubmit, pristine, submitting,
      handleEmailChange, handlePasswordChange, handlePhoneChange, valid,
    } = this.props

    return (
      <Card style={style.card}>
        <div>
          <h3 style={style.title}>Admin SignUp</h3>
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              component={RenderTextField}
              label="Email"
              validate={required}
              onChange={handleEmailChange}
              style={style.input}
            />
            <Field
              name="password"
              type='password'
              component={RenderTextField}
              label="Password"
              validate={[required, minimumLength]}
              onChange={handlePasswordChange}
              style={style.input}
            />
            <Typography variant='caption'>Minimum 8 charaters</Typography>
            <Field
              name="phone"
              component={RenderTextField}
              label="Phone Number"
              validate={[phone]}
              onChange={handlePhoneChange}
              style={style.input}
            />
            <Button
              type="submit"
              disabled={pristine || submitting || !valid}
              variant='contained'
              style={style.button}
            >Sign Up</Button>
          </form>
        </div>
      </Card>
    )
  }
}

AdminSignUp = reduxForm({
  form: 'adminSignup',
})(AdminSignUp)

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps)(AdminSignUp)
