import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { yupValidationSchema } from '../utils/validations'
import countryCodes from '../utils/countryCodes'
import { formStyle } from './Admin/styles'
import { TextField, Select } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
import { MenuItem, Divider, Button, Grid, Typography, InputLabel } from '@material-ui/core'
import MuiTextField from '@material-ui/core/TextField'
import { Autocomplete, AutocompleteRenderInputParams } from 'formik-material-ui-lab'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SubmissionConfirmation } from './SubmissionConfirmation'
import { signUpTraveler } from '../actions/signUp'
import { checkFlight } from '../actions/flight'
import { connect } from 'react-redux'
import api from '../api/api'
import { useHistory } from 'react-router-dom'
import { AdminFormExtension } from './AdminFormExtension'

const RegisterForm = (props:any) => {
  const [state, setState] = useState({
    open: false,
  })
  const history = useHistory()
  const {
    showAdditionalButtons,
    sendText,
    deleteTraveler,
    flight,
    isAdmin,
    formTitle,
    initialValues,
    isEdit,
    users,
  } = props

  const handleClose = () => {
    setState({ open: false })
  }

  const confirmSubmit = async (values: any) => {
    const { flight } = props
    const travelerInfo = Object.assign({}, values, {
      scheduledArrivalTime: flight.arrivalTimeUtc,
      countryCode: values.countryCode.code,
    })
    try {
      let res
      if (isEdit) res = await api.updateTraveler(travelerInfo)
      else res = await api.createTraveler(travelerInfo)
      props.signUpTraveler(res)
      handleClose()
      if (!props.user) history.push('/success', { res: res })
      else history.push('/travelers')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = (values: any, {setSubmitting} : any) => {
    const { flightNum, airlineCode, scheduledArrivalTime } = values
    const day = scheduledArrivalTime.getDate()
    const year = scheduledArrivalTime.getYear() + 1900
    const month = scheduledArrivalTime.getMonth() + 1
    props.checkFlight(airlineCode, flightNum, year, month, day)
      .then(() => {
        setState({ open: true })
        setSubmitting(false)
      })
      .catch(() => {
        setState({ open: false })
        setSubmitting(false)
      })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        enableReinitialize
        initialValues={
          isAdmin
            ? {
              ...initialValues,
              flightStatus: '',
              passengerStatus: '',
              representative: '',
            }
            : {
              name: '',
              nationality: '',
              requireInterpreter: 'false',
              preferredLanguage: 'English',
              email: '',
              countryCode: {
                code: 1,
                label: 'USA or Canada - +1',
              },
              phone: '',
              connectivity: 'true',
              flightNum: '',
              secondaryContactName: '',
              secondaryContactPhone: '',
              secondaryContactRelation: '',
              scheduledArrivalTime: new Date(),
              airlineCode: '',
            }
        }
        onSubmit={handleSubmit}
        validateOnChange={false}
        validationSchema={yupValidationSchema(isAdmin)}
      >
        {props => {
          const {
            touched,
            errors,
            isSubmitting,
            submitForm,
          } = props
          return (
            <Grid container >
              <Form style={formStyle.form}>
                <h1 style={formStyle.header}>{formTitle}</h1>
                <Divider />
                <Typography variant='h5' display='block'>Personal and Contact Details</Typography>
                <Typography variant='caption' paragraph><em>Tell us about yourself, so our lawyers can can best assist you.</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={5}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <Field
                      name="name"
                      id='name'
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel htmlFor="nationality">Nationality</InputLabel>
                    <Field
                      name="nationality"
                      id="nationality"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel htmlFor="requireInterpreter">Are you comfortable speaking English?</InputLabel>
                    <Field
                      name='requireInterpreter'
                      label='Are you comfortable speaking English?'
                      component={Select}
                      style={formStyle.input}
                      inputProps={{
                        id: 'requireInterpreter',
                      }}
                    >
                      <MenuItem value="true">No</MenuItem>
                      <MenuItem value="false">Yes</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel htmlFor='preferredLanguage'>Preferred Language(s)</InputLabel>
                    <Field
                      name="preferredLanguage"
                      id="preferredLanguage"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Field
                      name="email"
                      id='"email"'
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="countryCode"
                      component={Autocomplete}
                      options={countryCodes}
                      getOptionLabel={(option: any) => option.label}
                      getOptionSelected={(option: { label: string }, value: { label: string }) => value.label === option.label}
                      renderInput={(params: AutocompleteRenderInputParams) => {
                        return (
                          <TextField
                            {...params}
                            label="Country Phone Code"
                            style={formStyle.input}
                          />
                        )
                      }
                      }
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="phone"
                      label="Phone Number"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel htmlFor="connectivity">Do you have a smartphone?</InputLabel>
                    <Field
                      name="connectivity"
                      component={Select}
                      style={formStyle.input}
                      inputProps={{
                        id: 'connectivity',
                      }}
                    >
                      <MenuItem className="traveler-has-phone-option" value="true">Yes</MenuItem>
                      <MenuItem className="traveler-has-no-phone-option" value="false">No</MenuItem>
                    </Field>
                  </Grid>
                </Grid>
                <Typography variant='h5' display='block'>Travel details</Typography>
                <Typography variant='caption' paragraph><em>Tell us when your flight arrives, so we know when to check in with you.</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="scheduledArrivalTime"
                      label="What day do you arrive?"
                      component={DatePicker}
                      format="MM/dd/yyyy"
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="airlineCode"
                      label="Airline code"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="flightNum"
                      label="Flight number"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                </Grid>
                <Typography variant='h5' display='block'>Emergency contact</Typography>
                <Typography variant='caption' paragraph><em>Who can we contact if we can't get in touch with you?</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactName"
                      label="Name"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactPhone"
                      label="Phone Number"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactRelation"
                      label="Relationship to you"
                      component={TextField}
                      style={formStyle.input}
                    />
                  </Grid>
                </Grid>
                {isAdmin &&
                  <AdminFormExtension users={users} {...props}/>
                }
                <Grid container>
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
                </Grid>
                {
                  showAdditionalButtons &&
                  <Grid container>
                    <Button
                      variant='contained'
                      onClick={sendText}
                      style={formStyle.adminButton}
                    > Text Traveler
                    </Button>

                    <Button
                      variant='contained'
                      onClick={deleteTraveler}
                      style={formStyle.adminButton}
                    >Delete Traveler
                    </Button>
                  </Grid>
                }
              </Form>
              <SubmissionConfirmation
                open={state.open}
                flight={flight}
                handleClose={handleClose}
                confirmSubmit={confirmSubmit}
              />
            </Grid>
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
  checkFlight: (code: any, flightNum: any, year: any, month: any, day: any) => dispatch(checkFlight(code, flightNum, year, month, day)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterForm)
