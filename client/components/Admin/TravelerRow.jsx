import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import { nameStyle, phoneStyle, nationalityStyle, flightStyle, idStyle } from './styles'


export default ({ traveler }) => (
		<TableRow onTouchTap={() => browserHistory.push(`/admin/${traveler.id}`)}>
			<TableRowColumn style={idStyle}>{traveler.id}</TableRowColumn>
			<TableRowColumn style={nameStyle}>{traveler.name}</TableRowColumn>
			<TableRowColumn style={phoneStyle}>{traveler.phone}</TableRowColumn>
			<TableRowColumn style={nationalityStyle}>{traveler.nationality}</TableRowColumn>
			<TableRowColumn style={flightStyle}>{traveler.flight.number}</TableRowColumn>
			<TableRowColumn>{traveler.flight.date} {traveler.flight.time}</TableRowColumn>
			<TableRowColumn>{traveler.status}</TableRowColumn>
		</TableRow>

)