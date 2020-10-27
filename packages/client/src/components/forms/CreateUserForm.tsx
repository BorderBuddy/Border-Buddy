import React from 'react'
import {Button, Card, InputLabel} from '@material-ui/core'
import { adminSignUp } from '../Admin/styles'
import { phoneRegExp } from '../../utils/validations'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { TextField } from 'formik-material-ui'

export const CreateUserForm = ({handleSubmit}: any) => {
  const style = adminSignUp
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        phone: '',
      }}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validationSchema={
        Yup.object().shape(
          {
            email: Yup.string()
              .email()
              .required('Email is a required field'),
            password: Yup.string()
              .required('Password is a required field'),
            phone: Yup.string()
              .required('Phone Number is a required field')
              .matches(phoneRegExp, 'Invalid phone, please enter as 5552224444'),
          })}
    >
      <Card style={style.card}>
        <div>
          <h3 style={style.title}>Create New User</h3>
          <Form>
            {/* <InputLabel htmlFor='email'>Email</InputLabel> */}
            <Field
              name="email"
              label='Email'
              component={TextField}
              type='email'
              style={style.input}
            />
            {/* <InputLabel htmlFor='newPassword'>New Password</InputLabel> */}
            <Field
              name="password"
              label='Password'
              component={TextField}
              type="password"
              style={style.input}
            />
            {/* <InputLabel htmlFor='phone'>Phone Number</InputLabel> */}
            <Field
              name="phone"
              label='Phone Number'
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
