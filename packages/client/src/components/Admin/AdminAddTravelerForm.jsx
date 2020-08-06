import React from 'react'
import AdminFormExtension from '../AdminFormExtension'
import RegisterForm from '../RegisterForm'

export const EditForm = (props) => {
  return (
    <RegisterForm formTitle={props.title} isAdmin={true} initialValues={props.initialValues}>
      <AdminFormExtension {...props} />
    </RegisterForm>
  )
}

