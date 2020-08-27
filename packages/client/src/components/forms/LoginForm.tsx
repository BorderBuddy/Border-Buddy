import React from 'react'
import { Card, CardContent, Button, Typography, InputLabel, Box } from '@material-ui/core'
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
              component={TextField}
              type='email'
              InputProps={{style: formStyle.input}}
              style={formStyle.textField}
              label='Email'
            />
            <Field
              name="password"
              component={TextField}
              type='password'
              InputProps={{style: formStyle.input}}
              label='Password'
              style={formStyle.textField}
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
              >{auth.error}
              </p>
            }
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
