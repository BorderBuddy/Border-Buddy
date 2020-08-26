import React from 'react'
import { Card, CardContent, Button, Typography } from '@material-ui/core'
import { signupLoginStyle, formStyle } from '../Admin/styles'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

export const LoginForm = ({
  handleSubmit,
  pristine,
  submitting,
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
      <Card>
        <CardContent>
          <Typography variant='h5' style={style.title}>Admin Login</Typography>
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
            <Button
              type="submit"
              disabled={pristine || submitting}
              variant='contained'
              color='primary'
              style={formStyle.submitButton}
            > Login </Button>
          </Form>
        </CardContent>
      </Card>
    </Formik>
  )
}
