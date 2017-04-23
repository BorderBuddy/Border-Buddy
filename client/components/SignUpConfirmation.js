import React from 'react';
import {Dialog, FlatButton} from 'material-ui';
import FlightConfirmation from './FlightConfirmation';

export default ({ confirmSubmit, open, flight }) => {
  const actions = [
    <FlatButton
      key={1}
      id="dismiss-confirmation"
      label="OK"
      primary={true}
      onTouchTap={confirmSubmit}
    />
  ];

  return (
    <div>
      <Dialog
        id="sign-up-confirmation"
        open={open}
        actions={actions}
        modal={true}
        title={'Traveler submitted'}>
        {
          flight && Object.keys(flight).length ?
            <FlightConfirmation flight={flight}/>
            : <h4>Sorry, we could not find your flight or it has already landed.</h4>
        }
      </Dialog>
    </div>
  );
};
