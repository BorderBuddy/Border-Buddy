import React from 'react';
// import {Field} from 'redux-form';
import {required, phone, email, validateCode, uppercase} from '../utils/validations';
import {formStyle} from './Admin/styles';
import {TextField} from '@material-ui/core';

export const RenderTextField = ({
  label,
  name,
  input,
  meta: {touched, invalid, error},
  ...custom
}) => {
  return (
    <TextField
      name={name}
      className={`traveler-${name}`}
      error={touched && invalid}
      helperText={touched && error}
      label={label}
      {...input}
      {...custom}
    />
  )
}


// export const renderTextField = ({
//   label,
//   input,
//   meta: { touched, invalid, error },
//   ...custom
// }) => (
//   <TextField
//     name={props.name}
//     className={`traveler-${name}`}
//     label={label}
//     placeholder={label}
//     error={touched && invalid}
//     helperText={touched && error}
//     {...input}
//     {...custom}
//   />
// )