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
  auth,
} : any) => {
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
      <Card style={signupLoginStyle.card}>
        <CardContent>
          <Typography variant='h5'>Admin Login</Typography>
          <Form>
            <Field
              style={signupLoginStyle.input}
              name="email"
              component={TextField}
              type='email'
              label='Email'
            />
            <Field
              style={signupLoginStyle.input}
              name="password"
              component={TextField}
              type='password'
              label='Password'
            />
            <div>
              {
                auth.fetching &&
              <p>Logging In...</p>
              }
              {
                auth.error &&
              <p
                style={signupLoginStyle.error}
              >
                {auth.error}
              </p>
              }
            </div>
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
