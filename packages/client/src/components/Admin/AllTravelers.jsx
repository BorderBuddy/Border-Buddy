import React from 'react'
import TravelerRow from './TravelerRow'

import {
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Paper,
} from '@material-ui/core'

import {
  nameStyle,
  phoneStyle,
  countryCodeStyle,
  emailStyle,
  nationalityStyle,
  idStyle,
  flightCodeStyle,
  flightNumStyle,
  flightStatusStyle,
  arrivalTimeStyle,
  travelerStatusStyle,
} from './styles'

export const AllTravelers = ({ travelers }) => (
  <TableContainer component={Paper}>
    <Table aria-label="traveler table">
      <TableHead>
        <TableRow >
          <TableCell style={idStyle}>ID</TableCell>
          <TableCell style={nameStyle}>Name</TableCell>
          <TableCell style={countryCodeStyle}>Code</TableCell>
          <TableCell style={phoneStyle}>Phone</TableCell>
          <TableCell style={emailStyle}>Email</TableCell>
          <TableCell style={nationalityStyle}>Nationality</TableCell>
          <TableCell style={flightCodeStyle}>Airline Code</TableCell>
          <TableCell style={flightNumStyle}>Flight #</TableCell>
          <TableCell style={arrivalTimeStyle}>Arrival Time</TableCell>
          <TableCell style={flightStatusStyle}>Flight Status</TableCell>
          <TableCell style={travelerStatusStyle}>Traveler Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody className="all-travelers">
        {travelers &&
          travelers.map((traveler) => (
            <TravelerRow traveler={traveler} key={traveler.id} />
          ))}
      </TableBody>
    </Table>
  </TableContainer>
)
