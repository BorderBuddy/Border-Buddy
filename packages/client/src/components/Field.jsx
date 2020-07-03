import React from 'react'
import { formStyle } from './Admin/styles'
import { TextField, FormHelperText, FormControl, InputLabel, Select } from '@material-ui/core'
import { useField } from 'formik'

// NOTE:
// Formik will automagically inject onChange, onBlur, name, and value props
// of the field designated by the name prop to the (custom) component.
export const RenderTextField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props.field)
  const { touched, invalid, error } = meta

  return (
    <TextField
      // className={`traveler-${name}`}
      name={name}
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...field }
    />
  )
}

export const RenderSelectField = ({ label, children, ...props }) => {
  // console.log(props)
  // console.log(props.field)
  const [meta] = useField(props.field)
  const { touched, error } = meta
  return (
    <FormControl error={touched && error} style={formStyle.select}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Select
        inputProps={{
          name: { name },
          id: { name }
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )
}

export const RenderAirlinePicker = ({
  input,
  name,
  label,
  meta: {
    asyncValidating,
    touched,
    error,
    invalid
  },
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

  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export const RenderDatePicker = ({
  name,
  label,
  input,
  meta: {
    touched,
    error,
    invalid
  },
  ...custom
}) => {
  return (
    <TextField
      style={formStyle.select}
      label={label}
      type="date"
      {...custom}
      {...input}
      name={name}
      InputLabelProps={{
        shrink: true
      }}
    />
  )
}
