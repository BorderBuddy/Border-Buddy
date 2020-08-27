/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { yupValidationSchema } from '../../utils/validations'
import countryCodes from '../../utils/countryCodes'
import { formStyle } from '../Admin/styles'
import { TextField, Select } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
import { MenuItem, Divider, Button, Grid, Typography, InputLabel, TextFieldProps, TextField as MuiTextField } from '@material-ui/core'
import { Autocomplete } from 'formik-material-ui-lab'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { SubmissionConfirmation } from '../SubmissionConfirmation'
import api from '../../api/api'
import { useHistory } from 'react-router-dom'
import { AdminFormExtension } from './AdminExtensionForm'
import { Flight } from '../../models/models'

export const RegisterForm = (props:any) => {
  const [ open, setOpen ] = useState(false)
  const [flight, setFlight] = useState({} as Flight)
  const history = useHistory()
  const {
    showAdditionalButtons,
    sendText,
    deleteTraveler,
    isAdmin,
    formTitle,
    initialValues,
    isEdit,
    users,
  } = props

  const handleClose = () => {
    setOpen(false)
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
      handleClose()
      if (!props.user) history.push('/success', { res: res })
      else history.push('/travelers')
    } catch (err) {
      console.error(err)
    }
  }

  const handleSubmit = async (values: any) => {
    const { flightNum, airlineCode, scheduledArrivalTime } = values
    const day = scheduledArrivalTime.getDate()
    const year = scheduledArrivalTime.getYear() + 1900
    const month = scheduledArrivalTime.getMonth() + 1
    try {
      setFlight(await api.checkFlight(airlineCode, flightNum, year, month, day))
      setOpen(true)
    } catch (err) {
      setOpen(false)
    }
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
            submitForm,
          } = props
          return (
            <Grid container style={{justifyContent: 'center'}}>
              <Form style={formStyle.form}>
                <h1 style={formStyle.header}>{formTitle}</h1>
                <Divider />
                <Typography variant='h5' display='block'>Personal and Contact Details</Typography>
                <Typography variant='caption' paragraph><em>Tell us about yourself, so our lawyers can can best assist you.</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="name"
                      id='name'
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                      label='Name'
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>

                    <Field
                      name="nationality"
                      id="nationality"
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                      label='Nationality'
                    />

                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel shrink htmlFor="requireInterpreter">Are you comfortable speaking English?</InputLabel>
                    <Field
                      name='requireInterpreter'
                      component={Select}
                      style={formStyle.select}
                      inputProps={{
                        id: 'requireInterpreter',
                        style: formStyle.input,
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
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                      label='Preferred Language'
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <Field
                      name="email"
                      id="email"
                      label='Email'
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel shrink htmlFor="countryCode">Country Phone Code</InputLabel>
                    <Field
                      name="countryCode"
                      id='countryCode'
                      style={formStyle.select}
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
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                    />
                  </Grid>
                  <Grid item xs={11} sm={5}>
                    <InputLabel shrink htmlFor="connectivity">Do you have a smartphone?</InputLabel>
                    <Field
                      name="connectivity"
                      component={Select}
                      style={formStyle.select}
                      inputProps={{
                        id: 'connectivity',
                        style: formStyle.input,
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
                    <InputLabel shrink htmlFor='scheduledArrivalTime'>What day do you arrive?</InputLabel>
                    <Field
                      name="scheduledArrivalTime"
                      component={DatePicker}
                      format="MM/dd/yyyy"
                      style={formStyle.select}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="airlineCode"
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                      label='Airline Code'
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="flightNum"
                      label='Flight number'
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                    />
                  </Grid>
                </Grid>
                <Typography variant='h5' display='block'>Emergency contact</Typography>
                <Typography variant='caption' paragraph><em>Who can we contact if we can't get in touch with you?</em></Typography>
                <Grid container direction='row' alignItems='center' justify='space-around'>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactName"
                      label='Secondary Contact Name'
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactPhone"
                      label='Phone Number'
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                    />
                  </Grid>
                  <Grid item xs={11} sm={3}>
                    <Field
                      name="secondaryContactRelation"
                      label='Relationship to you'
                      component={TextField}
                      InputProps={{style: formStyle.input}}
                      style={formStyle.textField}
                    />
                  </Grid>
                </Grid>
                {isAdmin &&
                  <AdminFormExtension users={users} {...props} />
                }
                <Grid container>
                  <Button
                    variant='contained'
                    className="submit-traveler-registration"
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
