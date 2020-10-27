import React from 'react'
import { flightConfirmationConverter } from '../converters/FlightConfirmation'
import { Grid } from '@material-ui/core'
// TODO: Fix explicit any type
const FlightConfirmation = (props : any) => {
  const {
    arrivalCityName,
    arrivalAirportName,
    departureCityName,
    departureAirportName,
    arrivalAirportFsCode,
    departureAirportFsCode,
    airlineName,
    departureTimeLocalDate,
    arrivalTimeLocalDate,
    departureTimeLocalTime,
    arrivalTimeLocalTime,
    flightNumber,
  } = flightConfirmationConverter(props)

  return (
    <Grid container>
      <Grid direction='row' container justify='space-around'>
        <Grid item xs={10} md={10}>
          <h2 className='center'>{airlineName} {flightNumber} {departureAirportName} to {arrivalAirportName}</h2>
        </Grid>
      </Grid>
      <Grid direction='row' container justify='space-around'>
        <Grid item xs={10} md={6}>
          <h2 className="center m1">Departing</h2>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <h4 className="center m1">From:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="m1">{departureCityName} - {departureAirportFsCode}</h4>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <h4 className="center m1">Date:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="m1">{departureTimeLocalDate}</h4>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <h4 className="center m1">Time:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="m1">{departureTimeLocalTime}</h4>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid direction='row' container justify='space-around'>
        <Grid item xs={10} md={6}>
          <h2 className="center m1">Arriving</h2>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <h4 className="center m1">To:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="m1">{arrivalCityName} - {arrivalAirportFsCode}</h4>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <h4 className="center m1">Date:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="m1">{arrivalTimeLocalDate}</h4>
            </Grid>
          </Grid>
          <Grid container direction='row'>
            <Grid item xs={6}>
              <h4 className="center m1">Time:</h4>
            </Grid>
            <Grid item xs={6}>
              <h4 className="m1">{arrivalTimeLocalTime}</h4>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default FlightConfirmation
