import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import {Button, Card, Typography} from '@material-ui/core'
import { RenderTextField } from '../Field'
import { connect } from 'react-redux'
import { adminSignUp } from './styles'
import { minimumLength, required, phone } from '../../utils/validations'
import { whoAmI } from '../../actions/auth'

class UpdateUser extends Component {
  componentDidMount () {
    this.props.whoAmI()
      .then(() => {
        this.props.initialize(this.props.initialValues)
      })
  }

  render () {
    const style = adminSignUp
    const {
      handleSubmit, submitting,
      handleEmailChange, handleOldPasswordChange, handleNewPasswordChange, handlePhoneChange, valid
    } = this.props

    return (
      <Card style={style.card}>
        <div>
          <h3 style={style.title}>Update Profile</h3>
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
              name="oldPassword"
              type="password"
              component={RenderTextField}
              label='Old Password'
              onChange={handleOldPasswordChange}
              style={style.input}
            />
            <Typography md={12} variant='caption'>Provide your old password to make a new password</Typography>
            <Field
              name="newPassword"
              type="password"
              component={RenderTextField}
              label="New Password"
              onChange={handleNewPasswordChange}
              style={style.input}
            />
            <Typography md={12} variant='caption'>Minimum 8 characters</Typography>
            <Field
              name="phone"
              component={RenderTextField}
              label="Phone Number"
              validate={[phone, required]}
              onChange={handlePhoneChange}
              style={style.input}
            />
            <Button
              type="submit"
              disabled={submitting || !valid}
              variant='contained'
              color='primary'
              style={style.button}
            >
              Save
            </Button>
          </form>
        </div>
      </Card>
    )
  }
}

UpdateUser = reduxForm({
  form: 'updateUser'
})(UpdateUser)

const mapStateToProps = ({ auth }) => {
  return {
    initialValues: Object.assign({}, auth, { oldPassword: '', newPassword: '' })
  }
}

const mapDispatchToProps = dispatch => ({
  whoAmI: (id) => dispatch(whoAmI(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)
