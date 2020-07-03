import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
// import { RenderTextField, RenderSelectField, RenderAirlinePicker, RenderDatePicker } from './Field'
import { required, phone, email, validateCode, uppercase, yupValidationSchema } from '../utils/validations'
// import { CountryCodePicker } from './CountryCodePicker'
import countryCodes from '../utils/countryCodes'
import * as Yup from 'yup'
// import { Field } from 'redux-form'
// import { Button, Divider } from '@material-ui/core'
// import Autocomplete from '@material-ui/lab/Autocomplete'
import { formStyle } from './Admin/styles'
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch
} from 'formik-material-ui'
import { MenuItem } from '@material-ui/core'
import MuiTextField from '@material-ui/core/TextField'
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab'
export const DisplayFormikState = (props: any) =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem'
      }}
    >
      <strong>props</strong> ={' '}
      {JSON.stringify(props, null, 2)}
    </pre>
  </div>
export const RegisterForm = (props:any) => {
  console.log(`RegisterForm props passed: ${JSON.stringify(props)}`)
  const { isAdmin } = props

  return (
    <Formik
      initialValues={{
        name: '',
        nationality: '',
        requireInterpreter: 'false',
        preferredLanguage: 'English',
        email: '',
        countryCode: {
          code: 1,
          label: 'USA or Canada - +1'
        },
        connectivity: 'true'
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
      validationSchema={yupValidationSchema(isAdmin)}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset
        } = props
        return (
          <Form>
            <Field
              name="name"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
              label="Name"
            />

            <Field
              name="nationality"
              label="Nationality"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
            />

            <Field
              name='requireInterpreter'
              label='Are you comfortable speaking English?'
              component={TextField}
              select
              type='text'
              variant='standard'
              helperText='Please select Yes or No'
              InputLabelProps={{
                shrink: false
              }}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
              // margin='normal'
            >
              <MenuItem value="true">No</MenuItem>
              <MenuItem value="false">Yes</MenuItem>
            </Field>

            <Field
              name="preferredLanguage"
              label="Preferred language(s)"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
            />

            <Field
              name="email"
              label="Email"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
            />

            <Field
              name="countryCode"
              // multiple
              component={Autocomplete}
              options={countryCodes}
              getOptionLabel={(option: any) => option.label}
              getOptionSelected={(option: { label: string }, value: { label: string }) => value.label === option.label}
              renderInput={(params: AutocompleteRenderInputParams) => {
                return (
                  <MuiTextField
                    {...params}
                    error={touched.countryCode && !!errors.countryCode}
                    helperText={touched.countryCode && errors.countryCode}
                    label="Country Phone Code"
                  // style={formStyle.input}
                  // underlineFocusStyle={formStyle.underline}
                  />
                )
              }
              }
            />

            <Field
              name="phone"
              label="Phone Number"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
            />

            <Field
              name="connectivity"
              label="Do you have a smartphone?"
              component={TextField}
              select
              // style={formStyle.input}
              // underlineFocusStyle={formStyle.underline}
            >
              <MenuItem className="traveler-has-phone-option" value="true">Yes</MenuItem>
              <MenuItem className="traveler-has-no-phone-option" value="false">No</MenuItem>
            </Field>

            <Field
              name="scheduledArrivalTime"
              // style={formStyle.input}
              // component={RenderDatePicker}
              // underlineFocusStyle={formStyle.underline}
              // validate={!props.isAdmin ? required : undefined}
              label="What day do you arrive?"
            />

            <Field
              name="airlineCode"
              // style={formStyle.input}
              // underlineFocusStyle={formStyle.underline}
              // component={RenderAirlinePicker}
              // validate={!props.isAdmin ? [uppercase, required] : uppercase}
              label="Airline code"
            />

            <Field
              name="flightNum"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
              validate={!isAdmin ? required : undefined}
              label="Flight number"
            />

            <Field
              name="secondaryContactName"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
              label="Name"
            />

            <Field
              name="secondaryContactPhone"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
              label="Phone Number"
              validate={[phone]}
            />

            <Field
              name="secondaryContactRelation"
              component={TextField}
              // underlineFocusStyle={formStyle.underline}
              // style={formStyle.input}
              label="Relationship to you"
            />
            <DisplayFormikState {...props} />
            <button type="submit" disabled={isSubmitting}>
            Register
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}
// const Form = (props) => (
//   <form style={formStyle.form} onSubmit={props.handleSubmit}>
//     <h1 style={formStyle.header}>{props.formTitle}</h1>
//     <Divider />
//     <h3>Personal and Contact Details</h3>
//     <p><em>Tell us about yourself, so our lawyers can can best assist you.</em></p>
//     <div className="clearfix">
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="name"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           validate={required}
//           label="Name"
//         />
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="nationality"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           validate={!isAdmin ? required : undefined}
//           label="Nationality"
//         />
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="requireInterpreter"
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           component={RenderSelectField}
//           label="Are you comfortable speaking English?"
//         >
//           <option value="false">Yes</option>
//           <option value="true">No</option>
//         </Field>
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="preferredLanguage"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           label="Preferred language(s)"
//         />
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="email"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           validate={!isAdmin ? [required, email] : email}
//           label="Email"
//         />
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="countryCode"
//           component={CountryCodePicker}
//           style={formStyle.input}
//           underlineFocusStyle={formStyle.underline}
//           labelText="Country Phone Code"
//           filter={Autocomplete.caseInsensitiveFilter}
//           validate={required}
//         />
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="phone"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           label="Phone Number"
//           validate={[required, phone]}
//         />
//       </div>
//       <div className="field-container col-12 md-col md-col-6">
//         <Field
//           name="connectivity"
//           style={formStyle.input}
//           component={RenderSelectField}
//           underlineFocusStyle={formStyle.underline}
//           label="Do you have a smartphone?"
//           validate={!props.isAdmin ? required : undefined}
//         >
//           <option className="traveler-has-phone-option" value="true" primaryText="Yes">Yes</option>
//           <option className="traveler-has-no-phone-option" value="false" primaryText="No">No</option>
//         </Field>
//       </div>
//     </div>
//     <div className="clearfix">
//       <h3>Travel details</h3>
//       <p><em>Tell us when your flight arrives, so we know when to check in with you.</em></p>
//       <div className="field-container col-12 md-col sm-col-6 md-col-4">
//         <Field
//           name="scheduledArrivalTime"
//           style={formStyle.input}
//           component={RenderDatePicker}
//           underlineFocusStyle={formStyle.underline}
//           validate={!props.isAdmin ? required : undefined}
//           label="What day do you arrive?"
//         />
//       </div>
//       <div className="field-container col-12 md-col sm-col-6 md-col-4">
//         <Field
//           name="airlineCode"
//           style={formStyle.input}
//           underlineFocusStyle={formStyle.underline}
//           component={RenderAirlinePicker}
//           validate={!props.isAdmin ? [uppercase, required] : uppercase}
//           label="Airline code"
//         />
//       </div>
//       <div className="field-container col-12 md-col sm-col-6 md-col-4">
//         <Field
//           name="flightNum"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           validate={!props.isAdmin ? required : undefined}
//           label="Flight number"
//         />
//       </div>
//     </div>
//     <div className="clearfix">
//       <h3>Emergency contact</h3>
//       <p><em>Who can we contact if we can't get in touch with you?</em></p>
//       <div className="field-container col-12 md-col sm-col-6 md-col-4">
//         <Field
//           name="secondaryContactName"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           label="Name"
//         />
//       </div>
//       <div className="field-container col-12 md-col sm-col-6 md-col-4">
//         <Field
//           name="secondaryContactPhone"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           label="Phone Number"
//           validate={[phone]}
//         />
//       </div>
//       <div className="field-container col-12 md-col sm-col-6 md-col-4">
//         <Field
//           name="secondaryContactRelation"
//           component={RenderTextField}
//           underlineFocusStyle={formStyle.underline}
//           style={formStyle.input}
//           label="Relationship to you"
//         />
//       </div>
//     </div>
//     {/* {props.children /* renders the AdminExtension part of the form or any other additional fields you may want */ }
//     <div>
//       <Button
//         type="submit"
//         label="Register"
//         variant='contained'
//         className="submit-traveler-registration"
//         disabled={!props.valid}
//         color='primary'
//         style={formStyle.submitButton}
//       > Register</Button>
//       {
//         props.showAdditionalButtons &&
//         <div>
//           <Button
//             label="Text Traveler"
//             variant='contained'
//             onClick={props.sendText}
//             style={formStyle.adminButton}
//             labelColor="#2d6ea8"
//           >Text Traveler</Button>
//           <Button
//             label="Delete Traveler"
//             variant='contained'
//             onClick={props.deleteTraveler}
//             style={formStyle.adminButton}
//             backgroundColor="#bd1c11"
//             labelColor="#FFFFFF"
//           >Delete Traveler</Button>
//         </div>
//       }
//     </div>
//   </form>
// )

// export default Form
