import React from 'react'
import { useHistory } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'
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
  scheduledArrivalTimeStyle,
  travelerStatusStyle,
  setStatusColor
} from './styles'

export default ({ traveler }) => {
  const history = useHistory()
  const {
    id,
    name,
    phone,
    email,
    nationality,
    status: travelerStatus,
    countryCode
  } = traveler
  const { airlineCode, flightNum, scheduledArrivalTime, status: flightStatus } =
    traveler.flight || {}
  const timeString = new Date(scheduledArrivalTime).toLocaleString()
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
      <TableCell style={scheduledArrivalTimeStyle}>{timeString}</TableCell>
      <TableCell style={flightStatusStyle}>{flightStatus}</TableCell>
      <TableCell style={Object.assign({}, travelerStatusStyle, { color })}>
        {travelerStatus}
      </TableCell>
    </TableRow>
  )
}
