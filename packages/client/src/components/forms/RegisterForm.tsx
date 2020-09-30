import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { yupValidationSchema } from '../../utils/validations'
import { countryCodes } from '../../utils/countryCodes'
import { formStyle } from '../Admin/styles'
import { TextField, Select } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
import { MenuItem, Button, Grid, Typography, InputLabel, TextFieldProps, TextField as MuiTextField } from '@material-ui/core'
import { Autocomplete } from 'formik-material-ui-lab'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SubmissionConfirmation } from '../SubmissionConfirmation'
import api from '../../api/api'
import { useHistory } from 'react-router-dom'
import { AdminFormExtension } from './AdminExtensionForm'
import { FSFlight } from '../../models/models'
import ReCAPTCHA from 'react-google-recaptcha'

export const RegisterForm = (props:any) => {
  const style = formStyle
  const [ open, setOpen ] = useState(false)
  const [token, setToken] = useState('')
  const [flight, setFlight] = useState({} as FSFlight)
  const history = useHistory()
  const {
    showAdditionalButtons,
    sendText,
    deleteTraveler,
    isAdmin,
    formTitle,
    initialValues,
    isEdit,
  } = props

  const handleClose = () => {
    setOpen(false)
  }

  // TODO: pass the whole Flight Stats flight result to parse, so if it is in the past, don't create it
  const confirmSubmit = async (values: any) => {
    const travelerInfo = Object.assign({}, values, {
      countryCode: values.countryCode.code,
      scheduledArrivalTime: flight.arrivalTimeLocal,
    })
    try {
      let res
      if (isEdit) {
        res = await api.updateTraveler(initialValues.id, travelerInfo)
      } else {
        res = await api.createTraveler(travelerInfo)
      }
      handleClose()
      if (!isEdit) history.push('/success', { res: res })
      else history.push('/travelers')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (values: any) => {
    const { flightNum, airlineCode, scheduledArrivalTime } = values
    const flightDate = new Date(scheduledArrivalTime)
    const day = flightDate.getDate()
    const year = flightDate.getFullYear()
    const month = flightDate.getMonth() + 1
    try {
      const currentFlight = await api.checkFlight(airlineCode, flightNum, year, month, day, token)
      setFlight(currentFlight)
      setOpen(true)
    } catch (err) {
      console.log(err)
      // TODO: could replace this with a 'better' alert component/modal if we want
      alert('No flight found with those details...')
      setOpen(false)
    }
  }

  const getCountryCodeObj = (code: string) => {
    const countryCodeObj = countryCodes.filter((codes) => codes.code.toString() === code)[0]
    return countryCodeObj
  }

  const onCaptchaChange = (value: any) => {
    setToken(value)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        initialValues={
          isAdmin && initialValues
            ? {
              ...initialValues,
              countryCode: getCountryCodeObj(initialValues.countryCode),
            }
            : {
              name: '',
              nationality: '',
              requireInterpreter: 'false',
              preferredLanguage: 'English',
              email: '',
              countryCode: getCountryCodeObj('1'),
              phone: '',
              connectivity: 'true',
              flightNum: '',
              secondaryContactName: '',
              secondaryContactPhone: '',
              secondaryContactRelation: '',
              scheduledArrivalTime: new Date(),
              airlineCode: '',
              flightStatus: 'scheduled',
              passengerStatus: 'transit',
            }
        }
        onSubmit={handleSubmit}
        validateOnChange={false}
        validationSchema={yupValidationSchema(isAdmin)}
      >
        {props => {
          const {
            submitForm,
          } = props
          return (
            <Grid container style={{justifyContent: 'center'}}>
              <Form style={style.form}>
                <h1 style={style.header}>{formTitle}</h1>
                <Typography variant='h5' display='block'>Personal and Contact Details</Typography>
                <Typography variant='caption' paragraph><em>Tell us about yourself, so our lawyers can can best assist you.</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around' spacing={3}>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="name"
                      id='name'
                      component={TextField}
                      style={style.input}
                      label='Name'
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="nationality"
                      id="nationality"
                      component={TextField}
                      style={style.input}
                      label='Nationality'
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel shrink htmlFor="requireInterpreter">Are you comfortable speaking English?</InputLabel>
                    <Field
                      name='requireInterpreter'
                      component={Select}
                      style={style.select}
                      inputProps={{
                        id: 'requireInterpreter',
                      }}
                    >
                      <MenuItem value="true">No</MenuItem>
                      <MenuItem value="false">Yes</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="preferredLanguage"
                      id="preferredLanguage"
                      component={TextField}
                      style={style.input}
                      label='Preferred Language'
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="email"
                      id="email"
                      label='Email'
                      component={TextField}
                      style={style.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel shrink htmlFor="countryCode">Country Phone Code</InputLabel>
                    <Field
                      name="countryCode"
                      id='countryCode'
                      style={style.select}
                      component={Autocomplete}
                      options={countryCodes}
                      getOptionLabel={(option: any) => option.label}
                      getOptionSelected={(option: { label: string }, value: { label: string }) => value.label === option.label}
                      renderInput={(params: TextFieldProps) => (
                        <MuiTextField
                          name="countryCode"
                          {...params}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="phone"
                      label='Phone Number'
                      component={TextField}
                      style={style.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel shrink htmlFor="connectivity">Do you have a smartphone?</InputLabel>
                    <Field
                      name="connectivity"
                      component={Select}
                      style={style.select}
                      inputProps={{
                        id: 'connectivity',
                      }}
                    >
                      <MenuItem className="traveler-has-phone-option" value="true">Yes</MenuItem>
                      <MenuItem className="traveler-has-no-phone-option" value="false">No</MenuItem>
                    </Field>
                  </Grid>
                </Grid>
                <Typography variant='h5' display='block' style={style.heading}>Travel details</Typography>
                <Typography variant='caption' paragraph><em>Tell us when your flight arrives, so we know when to check in with you.</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={3}>
                    <InputLabel shrink htmlFor='scheduledArrivalTime'>What day do you arrive?</InputLabel>
                    <Field
                      name="scheduledArrivalTime"
                      component={DatePicker}
                      format="MM/dd/yyyy"
                      style={style.select}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="airlineCode"
                      component={TextField}
                      style={style.input}
                      label='Airline Code'
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="flightNum"
                      label='Flight number'
                      component={TextField}
                      style={style.input}
                    />
                  </Grid>
                </Grid>
                <Typography variant='h5' display='block' style={style.heading}>Emergency contact</Typography>
                <Typography variant='caption' paragraph><em>Who can we contact if we can't get in touch with you?</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactName"
                      label='Secondary Contact Name'
                      component={TextField}
                      style={style.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactPhone"
                      label='Phone Number'
                      component={TextField}
                      style={style.input}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactRelation"
                      label='Relationship to you'
                      component={TextField}
                      style={style.input}
                    />
                  </Grid>
                </Grid>
                {isAdmin &&
                  <AdminFormExtension/>
                }
                <Grid container>
                  <ReCAPTCHA
                    sitekey="6Lf1Y9EZAAAAAMbB3DZ7UcOU0jNDv8jieSrTWeIA"
                    onChange={onCaptchaChange}
                  />
                </Grid>
                <Grid container>
                  <Button
                    variant='contained'
                    className="submit-traveler-registration"
                    color='primary'
                    style={style.submitButton}
                    onClick={submitForm}
                  >
                    {isEdit ? 'Save' : 'Register'}
                  </Button>
                </Grid>
                {
                  showAdditionalButtons &&
                  <Grid container>
                    <Button
                      variant='contained'
                      onClick={sendText}
                      style={style.adminButton}
                    > Text Traveler
                    </Button>

                    <Button
                      variant='contained'
                      onClick={deleteTraveler}
                      style={style.adminButton}
                    >Delete Traveler
                    </Button>
                  </Grid>
                }
              </Form>
              <SubmissionConfirmation
                open={open}
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
