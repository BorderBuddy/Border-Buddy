import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { 
	nameStyle, 
	phoneStyle, 
	emailStyle,
	nationalityStyle, 
	idStyle, 
	flightCodeStyle,
	flightNumStyle,
	flightStatusStyle,
	arrivalTimeStyle,
	travelerStatusStyle,
	setStatusColor
} from './styles';


export default ({ traveler }) => {
	const { id, name, phone, email, nationality, status: travelerStatus } = traveler;
	const { airlineCode, flightNum, arrivalTime, status: flightStatus } = traveler.flight || {};
	const timeString = (new Date(arrivalTime)).toLocaleString();
	const color = setStatusColor(travelerStatus);
	return (
		<TableRow onTouchTap={() => browserHistory.push(`/admin/travelers/${traveler.id}`)}>
			<TableRowColumn style={idStyle}>{id}</TableRowColumn>
			<TableRowColumn style={nameStyle}>{name}</TableRowColumn>
			<TableRowColumn style={phoneStyle}>{phone}</TableRowColumn>
			<TableRowColumn style={emailStyle}>{email}</TableRowColumn>
			<TableRowColumn style={nationalityStyle}>{nationality}</TableRowColumn>
			<TableRowColumn style={flightCodeStyle}>{airlineCode}</TableRowColumn>
			<TableRowColumn style={flightNumStyle}>{flightNum}</TableRowColumn>
			<TableRowColumn style={arrivalTimeStyle}>{timeString}</TableRowColumn>
			<TableRowColumn style={flightStatusStyle}>{flightStatus}</TableRowColumn>
			<TableRowColumn style={Object.assign({}, travelerStatusStyle, { color })}>{travelerStatus}</TableRowColumn>
		</TableRow>
	)
}