import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { yupValidationSchema } from '../utils/validations'
import countryCodes from '../utils/countryCodes'
import { formStyle } from './Admin/styles'
import { TextField } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
import { MenuItem, Divider, Button } from '@material-ui/core'
import MuiTextField from '@material-ui/core/TextField'
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DisplayFormikState } from './DisplayFormikState'
import { SubmissionConfirmation } from './SubmissionConfirmation'
import { signUpTraveler } from '../actions/signUp'
import { checkFlight } from '../actions/flight'
import { connect } from 'react-redux'
import api from '../api/api'
import { useHistory } from 'react-router-dom'

const RegisterForm = (props:any) => {
  const [state, setState] = useState({
    open: false
  })
  const history = useHistory()
  const {
    showAdditionalButtons,
    sendText,
    deleteTraveler,
    flight
  } = props

  // TODO: isAdmin will be set by user context in props eventually
  const isAdmin = false
  const formTitle = 'Traveler Registration'

  const handleClose = () => {
    setState({ open: false })
  }

  const confirmSubmit = async (values: any) => {
    const { flight } = props
    const travelerInfo = Object.assign({}, values, {
      scheduledArrivalTime: flight.arrivalTimeUtc,
      countryCode: values.countryCode.code
    })
    try {
      const res = await api.createTraveler(travelerInfo)
      props.signUpTraveler(res)
      handleClose()
      if (!props.user) history.push('/success', { res: res })
      else history.push('/travelers')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (values: any) => {
    const { flightNum, airlineCode, scheduledArrivalTime } = values
    const day = scheduledArrivalTime.getDate()
    const year = scheduledArrivalTime.getYear() + 1900
    const month = scheduledArrivalTime.getMonth() + 1
    props.checkFlight(airlineCode, flightNum, year, month, day)
      .then(() => {
        setState({ open: true })
      })
      .catch(() => {
        setState({ open: false })
      })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
          phone: '',
          connectivity: 'true',
          flightNum: '',
          secondaryContactName: '',
          secondaryContactPhone: '',
          secondaryContactRelation: '',
          scheduledArrivalTime: new Date(),
          airlineCode: ''

        }}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validationSchema={yupValidationSchema(isAdmin)}
      >
        {props => {
          const {
            touched,
            errors,
            isSubmitting,
            submitForm
          } = props
          return (
            <div>
              <Form style={formStyle.form}>
                <h1 style={formStyle.header}>{formTitle}</h1>
                <Divider />
                <h3>Personal and Contact Details</h3>
                <p><em>Tell us about yourself, so our lawyers can can best assist you.</em></p>
                <div className="clearfix">
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="name"
                      component={TextField}
                      style={formStyle.input}
                      // underlineFocusStyle={formStyle.underline}
                      label="Name"
                    />
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="nationality"
                      label="Nationality"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name='requireInterpreter'
                      label='Are you comfortable speaking English?'
                      component={TextField}
                      select
                      type='text'
                      InputLabelProps={{
                        shrink: true
                      }}
                      style={formStyle.input}
                    >
                      <MenuItem value="true">No</MenuItem>
                      <MenuItem value="false">Yes</MenuItem>
                    </Field>
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="preferredLanguage"
                      label="Preferred language(s)"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="email"
                      label="Email"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="countryCode"
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
                            style={formStyle.input}
                          />
                        )
                      }
                      }
                    />
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="phone"
                      label="Phone Number"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col md-col-6">
                    <Field
                      name="connectivity"
                      label="Do you have a smartphone?"
                      component={TextField}
                      select
                      style={formStyle.input}
                    >
                      <MenuItem className="traveler-has-phone-option" value="true">Yes</MenuItem>
                      <MenuItem className="traveler-has-no-phone-option" value="false">No</MenuItem>
                    </Field>
                  </div>
                </div>
                <div className="clearfix">
                  <h3>Travel details</h3>
                  <p><em>Tell us when your flight arrives, so we know when to check in with you.</em></p>
                  <div className="field-container col-12 md-col sm-col-6 md-col-4">
                    <Field
                      name="scheduledArrivalTime"
                      label="What day do you arrive?"
                      component={DatePicker}
                      format="MM/dd/yyyy"
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col sm-col-6 md-col-4">
                    <Field
                      name="airlineCode"
                      label="Airline code"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col sm-col-6 md-col-4">
                    <Field
                      name="flightNum"
                      label="Flight number"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                </div>
                <div className="clearfix">
                  <h3>Emergency contact</h3>
                  <p><em>Who can we contact if we can't get in touch with you?</em></p>
                  <div className="field-container col-12 md-col sm-col-6 md-col-4">
                    <Field
                      name="secondaryContactName"
                      label="Name"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col sm-col-6 md-col-4">
                    <Field
                      name="secondaryContactPhone"
                      label="Phone Number"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                  <div className="field-container col-12 md-col sm-col-6 md-col-4">
                    <Field
                      name="secondaryContactRelation"
                      label="Relationship to you"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </div>
                </div>
                {/* <DisplayFormikState {...props} /> */}
                <div>
                  <Button
                    variant='contained'
                    className="submit-traveler-registration"
                    disabled={isSubmitting}
                    color='primary'
                    style={formStyle.submitButton}
                    onClick={submitForm}
                  >
                  Register
                  </Button>
                </div>
                {
                  showAdditionalButtons &&
        <div>
          <Button
            variant='contained'
            onClick={sendText}
            style={formStyle.adminButton}
            // labelColor="#2d6ea8"
          > Text Traveler
          </Button>

          <Button
            variant='contained'
            onClick={deleteTraveler}
            style={formStyle.adminButton}
            // backgroundColor="#bd1c11"
            // labelColor="#FFFFFF"
          >Delete Traveler
          </Button>
        </div>
                }
              </Form>
              <SubmissionConfirmation
                open={state.open}
                flight={flight}
                handleClose={handleClose}
                confirmSubmit={confirmSubmit}
              />
            </div>
          )
        }}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}

/* ---------------------------REDUX CONTAINER--------------------------- */

const mapStateToProps = ({ flight } : any) => ({ flight })

const mapDispatchToProps = (dispatch: any) => ({
  signUpTraveler: (traveler: any) => dispatch(signUpTraveler(traveler)),
  checkFlight: (code: any, flightNum: any, year: any, month: any, day: any) => dispatch(checkFlight(code, flightNum, year, month, day))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)
