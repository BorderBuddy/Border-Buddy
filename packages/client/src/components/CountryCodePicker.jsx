import React from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import countryCodes from '../utils/countryCodes'
import { formStyle } from './Admin/styles'

export const CountryCodePicker = ({
  labelText,
  name,
  meta: { touched, invalid, error },
  ...custom
}) => {
  return (
    <Autocomplete
      {...custom}
      filter={Autocomplete.caseInsensitiveFilter}
      options={countryCodes}
      helperText={touched && error}
      error={touched && invalid}
      getOptionLabel={(option) => option.label}
      renderInput={(params) =>
        <TextField {...params} label={labelText} style={formStyle.autoComplete} />}
    />
  )
}
