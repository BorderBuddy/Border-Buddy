import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { 
	nameStyle, 
	phoneStyle, 
	nationalityStyle, 
	idStyle, 
	flightCodeStyle,
	flightNumStyle,
	flightStatusStyle,
	arrivalTimeStyle,
	travelerStatusStyle
} from './styles';


export default ({ traveler }) => (
		<TableRow onTouchTap={() => browserHistory.push(`/admin/travelers/${traveler.id}`)}>
			<TableRowColumn style={idStyle}>{traveler.id}</TableRowColumn>
			<TableRowColumn style={nameStyle}>{traveler.name}</TableRowColumn>
			<TableRowColumn style={phoneStyle}>{traveler.phone}</TableRowColumn>
			<TableRowColumn style={nationalityStyle}>{traveler.nationality}</TableRowColumn>

			<TableRowColumn style={flightCodeStyle}>{traveler.flight.airlineCode}</TableRowColumn>
			<TableRowColumn style={flightNumStyle}>{traveler.flight.flightNum}</TableRowColumn>
			<TableRowColumn style={arrivalTimeStyle}>{traveler.flight.arrivalTime}</TableRowColumn>
			<TableRowColumn style={flightStatusStyle}>{traveler.flight.status}</TableRowColumn>

			<TableRowColumn style={travelerStatusStyle}>{traveler.status}</TableRowColumn>
		</TableRow>

)