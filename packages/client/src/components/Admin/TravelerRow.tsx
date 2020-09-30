import React from 'react'
import { useHistory } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'
import { Traveler } from '../../models/models'
import {
  nameStyle,
  countryCodeStyle,
  phoneStyle,
  emailStyle,
  nationalityStyle,
  idStyle,
  flightCodeStyle,
  flightNumStyle,
  flightStatusStyle,
  travelerStatusStyle,
  setStatusColor,
} from './styles'

export default ({traveler} : {traveler: Traveler}) => {
  const history = useHistory()
  const {
    id,
    name,
    phone,
    email,
    nationality,
    status: travelerStatus,
    countryCode,
  } = traveler
  const { airlineCode, flightNum, scheduledArrivalTime, status: flightStatus } =
    traveler.flight || {}
  // const timeString = new Date(scheduledArrivalTime).toLocaleString()
  const timeString = new Date(scheduledArrivalTime).toISOString()
  const color = setStatusColor(travelerStatus)
  return (
    <TableRow
      onClick={() => history.push(`/travelers/${traveler.id}`)}
    >
      <TableCell style={idStyle}>{id}</TableCell>
      <TableCell style={nameStyle}>{name}</TableCell>
      <TableCell style={countryCodeStyle}>{`+${countryCode}`}</TableCell>
      <TableCell style={phoneStyle}>{phone}</TableCell>
      <TableCell style={emailStyle}>{email}</TableCell>
      <TableCell style={nationalityStyle}>{nationality}</TableCell>
      <TableCell style={flightCodeStyle}>{airlineCode}</TableCell>
      <TableCell style={flightNumStyle}>{flightNum}</TableCell>
      <TableCell >{timeString}</TableCell>
      <TableCell style={flightStatusStyle}>{flightStatus}</TableCell>
      <TableCell style={Object.assign({}, travelerStatusStyle, { color })}>
        {travelerStatus}
      </TableCell>
    </TableRow>
  )
}
