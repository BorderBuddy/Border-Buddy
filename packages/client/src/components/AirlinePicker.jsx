import React from 'react';
import {TextField} from '@material-ui/core';

export const RenderAirlinePicker = ({ 
  input, 
  label, 
  meta: { 
    asyncValidating, 
    touched, 
    error, 
    invalid},
    ...custom
  }) => {
    return (
    <TextField
      className={asyncValidating ? 'async-validating' : ''}
      name={name}
      {...input}
      {...custom}
      label={label}
      helperText={touched && error}
      error={touched && invalid} />
)}