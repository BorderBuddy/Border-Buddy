import React, { Component} from 'react';
import { Button, Card, CardActions, CardTitle, CardText } from '@material-ui/core';
import { browserHistory } from 'react-router';
import { setStatusColor } from './styles';

const AllTravelersMobile = ({ travelers }) => {
  return (
    <div>
      { 
        travelers.map((traveler, i) => {
          const { id, name, phone, email, nationality, status: travelerStatus, countryCode } = traveler;
          const { airlineCode, flightNum, arrivalTime, status: flightStatus } = traveler.flight || {};
          const timeString = (new Date(arrivalTime)).toLocaleString();
          const color = setStatusColor(travelerStatus);
          const style = {
            passengerStatus: {
              color, "fontWeight": "bold",
            }
          }
          return (
            <div key={i} style={{ margin: '2em'}}>
              <Card>
                <CardTitle title={`${name}`} subtitle={`Traveler ID: ${id}`} />
                  <div className="field-container col-6 sm-col sm-col-6">
                    <CardTitle title="Traveler Information" />
                    <CardText style={style.passengerStatus}>{`Traveler Status: ${travelerStatus}`}</CardText>
                    <CardText>{`Country Code: +${countryCode}`}</CardText>
                    <CardText>{`Phone: ${phone}`}</CardText>
                    <CardText>{`Email: ${email}`}</CardText>
                    <CardText>{`Nationality: ${nationality}`}</CardText>
                  </div>
                  <CardTitle title="Flight Information" />
                  <div className="field-container col-6 sm-col sm-col-6">
                    <CardText>{`Airline Code: ${airlineCode}`}</CardText>
                    <CardText>{`Flight #: ${flightNum}`}</CardText>
                    <CardText>{`ArrivalTime: ${timeString}`}</CardText>
                    <CardText>{`Flight Status: ${flightStatus}`}</CardText>
                  </div>
                <CardActions>
                  <Button 
                    label="View/Edit Traveler"
                    color='primary'
                    variant='contained'
                    onTouchTap={() => browserHistory.push(`/admin/travelers/${traveler.id}`)}
                  />
                </CardActions>
              </Card>
            </div>
          )
        })
      }
    </div>
  )
}

export default AllTravelersMobile;