import React from 'react'
import {Button, Card} from '@material-ui/core'
import { adminSignUp } from '../Admin/styles'
import { phoneRegExp } from '../../utils/validations'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

export const CreateUserForm = (handleSubmit: any) => {
  const style = adminSignUp
  return (
    <Formik
      initialValues={{
        email: '',
        newPassword: '',
        phone: '',
      }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={
        Yup.object().shape(
          {
            email: Yup.string()
              .email()
              .required(),
            newPassword: Yup.string()
              .required(),
            phone: Yup.string()
              .required()
              .matches(phoneRegExp, 'Invalid phone, please enter as 5552224444'),
          })}
    >
      <Card style={style.card}>
        <div>
          <h3 style={style.title}>Update Profile</h3>
          <Form>
            <Field
              name="email"
              label="Email"
              component={TextField}
              type='email'
              style={style.input}
            />
            <Field
              name="newPassword"
              label="New Password"
              component={TextField}
              type="password"
              style={style.input}
            />
            <Field
              name="phone"
              label="Phone Number"
              component={TextField}
              style={style.input}
            />
            <Button
              type="submit"
              variant='contained'
              color='primary'
              style={style.button}
            >
              Create
            </Button>
          </Form>
        </div>
      </Card>
    </Formik>
  )
}
