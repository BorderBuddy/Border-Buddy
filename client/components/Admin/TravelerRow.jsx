import React, { Component } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { phoneStyle, nationalityStyle, flightStyle, idStyle } from './styles'


export default ({ selectTraveler, traveler, index }) => (
	
	<TableRow onTouchTap={() => selectTraveler(index)}>
	  <TableRowColumn style={idStyle}>{traveler.id}</TableRowColumn>
	  <TableRowColumn>{traveler.name}</TableRowColumn>
	  <TableRowColumn style={phoneStyle}>{traveler.phone}</TableRowColumn>
	  <TableRowColumn style={nationalityStyle}>{traveler.nationality}</TableRowColumn>
	  <TableRowColumn style={flightStyle}>{traveler.flight.number}</TableRowColumn>
	  <TableRowColumn>{traveler.flight.date} {traveler.flight.time}</TableRowColumn>
	  <TableRowColumn>{traveler.status}</TableRowColumn>
	</TableRow>

)