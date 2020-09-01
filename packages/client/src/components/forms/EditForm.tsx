import React from 'react'
import { RegisterForm } from './RegisterForm'

export const EditForm = (props: any) => {
  return (
    <RegisterForm
      formTitle={props.title}
      isAdmin={true}
      initialValues={props.initialValues}
      representatives={props.representatives}
      isEdit={true}
    />
  )
}

