import React from 'react';
import {formStyle} from './Admin/styles';
import {TextField, FormHelperText, FormControl, InputLabel, Select} from '@material-ui/core';

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
      name={name}
      className={asyncValidating ? 'async-validating' : ''}
      helperText={touched && error}
      error={touched && invalid}
      label={label}
      {...input}
      {...custom}
    />
  )
}

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const RenderSelectField = ({
  input,
  name,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <FormControl error={touched && error} style={formStyle.select}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        {...input}
        {...custom}
        inputProps={{
          name: {name},
          id: {name},
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}

