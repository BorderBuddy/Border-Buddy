import React, {Component} from 'react';
import TravelerRow from './TravelerRow'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { phoneStyle, nationalityStyle, flightStyle, idStyle } from './styles'

export default ({ travelers, selectTraveler }) => (
	
	
	<Table selectable={false}>
	    <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
	      <TableRow>
	        <TableHeaderColumn style={idStyle}>ID</TableHeaderColumn>
	        <TableHeaderColumn>Name</TableHeaderColumn>
	        <TableHeaderColumn style={phoneStyle}>Phone</TableHeaderColumn>
	        <TableHeaderColumn style={nationalityStyle} >Nationality</TableHeaderColumn>
	        <TableHeaderColumn style={flightStyle}>Flight #</TableHeaderColumn>
	        <TableHeaderColumn>Arrival Time</TableHeaderColumn>
	        <TableHeaderColumn>Status</TableHeaderColumn>
	      </TableRow>
	    </TableHeader>
	    <TableBody>
	      {
					travelers && travelers.map((traveler, index) =>
						<TravelerRow selectTraveler={selectTraveler} traveler={traveler} key={index} index={index} />)
	      }
	    </TableBody>
	  </Table>

)