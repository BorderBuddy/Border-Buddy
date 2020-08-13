import React from 'react'
import RegisterForm from '../RegisterForm'

export const EditForm = (props) => {
  return (
    <RegisterForm formTitle={props.title} isAdmin={true} initialValues={props.initialValues}/>
  )
}

