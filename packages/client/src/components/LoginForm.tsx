import React from 'react'
import { Card, Button } from '@material-ui/core'
import { signupLoginStyle, formStyle } from './Admin/styles'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

export const LoginForm = ({
  handleSubmit,
  pristine,
  submitting,
  handleEmailChange,
  handlePasswordChange,
  auth,
} : any) => {
  const style = signupLoginStyle

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={
        Yup.object().shape(
          {
            email: Yup.string()
              .email()
              .required(),
            password: Yup.string()
              .required(),
          })}
    >
      <Card style={style.card} >
        <h3 style={style.title}>Admin Login</h3>
        <Form>
          <Field
            name="email"
            label="Email"
            component={TextField}
            type='email'
            style={formStyle.input}
          />
          <Field
            name="password"
            label="Password"
            component={TextField}
            type='password'
            style={formStyle.input}
          />
          {
            auth.fetching &&
            <p
              style={style.loader}
            >Logging In...
            </p>
          }
          {
            auth.error &&
            <p
              style={style.error}
            >ERROR: {auth.error.message}
            </p>
          }
          <Button
            type="submit"
            disabled={pristine || submitting}
            variant='contained'
            color='primary'
            style={formStyle.input}
          > Login </Button>
        </Form>
      </Card>
    </Formik>
  )
}
