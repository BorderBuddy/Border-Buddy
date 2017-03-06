import React, {Component} from 'react';
import TravelerRow from './TravelerRow'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
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
	travelerStatusStyle
} from './styles';
export default ({ travelers, selectTraveler }) => (
	
	
	<Table selectable={false}>
	    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
	      <TableRow>
	        <TableHeaderColumn style={idStyle}>ID</TableHeaderColumn>
	        <TableHeaderColumn style={nameStyle}>Name</TableHeaderColumn>
	        <TableHeaderColumn style={phoneStyle}>Phone</TableHeaderColumn>
					<TableHeaderColumn style={emailStyle}>Email</TableHeaderColumn>
	        <TableHeaderColumn style={nationalityStyle} >Nationality</TableHeaderColumn>
	        <TableHeaderColumn style={flightCodeStyle}>Airline Code</TableHeaderColumn>
	        <TableHeaderColumn style={flightNumStyle}>Flight #</TableHeaderColumn>
	        <TableHeaderColumn style={arrivalTimeStyle}>Arrival Time</TableHeaderColumn>
	        <TableHeaderColumn style={flightStatusStyle}>Flight Status</TableHeaderColumn>
	        <TableHeaderColumn style={travelerStatusStyle}>Traveler Status</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody>
	      {
					travelers && travelers.map((traveler) =>
						<TravelerRow traveler={traveler} key={traveler.id} />)
	      }
	    </TableBody>
	  </Table>

)