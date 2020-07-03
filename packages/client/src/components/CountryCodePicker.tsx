import React from 'react'
import { TextField } from '@material-ui/core'
import Autocomplete, { AutocompleteRenderInputParams } from '@material-ui/lab/Autocomplete'
import countryCodes from '../utils/countryCodes'
import { formStyle } from './Admin/styles'
// import {
//   Autocomplete,
//   ToggleButtonGroup,
//   AutocompleteRenderInputParams
// } from 'formik-material-ui-lab'

// export const CountryCodePicker = ({
//   labelText,
//   name,
//   meta: { touched, invalid, error },
//   ...custom
// }) => {
//   return (
//     <Autocomplete
//       {...custom}
//       filter={Autocomplete.caseInsensitiveFilter}
//       options={countryCodes}
//       helperText={touched && error}
//       error={touched && invalid}
//       getOptionLabel={(option) => option.label}
//       renderInput={(params) =>
//         <TextField {...params} label={labelText} style={formStyle.autoComplete} />}
//     />
//   )
// }
// export const CountryCodePicker = () => {
//   return (
//     <Autocomplete
//       // name="countryCode"
//       // multiple
//       // component={Autocomplete}
//       options={countryCodes}
//       getOptionLabel={(option: any) => option.label}
//       // style={{ width: 300 }}
//       renderInput={(params: AutocompleteRenderInputParams) => (
//         <TextField
//           {...params}
//           error={touched.name && !!errors.name}
//           helperText={errors.name}
//           label="Country Phone Code"
//           // variant="outlined"
//         />
//       )}
//     />
//   )
// }
