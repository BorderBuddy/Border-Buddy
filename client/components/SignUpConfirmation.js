import React from 'react';
import {Dialog, FlatButton} from 'material-ui';
import FlightConfirmation from './FlightConfirmation';

export default ({ handleClose, open, flight }) => {
  const actions = [
    <FlatButton
      key={1}
      id="dismiss-confirmation"
      label="OK"
      primary={true}
      onTouchTap={handleClose}
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
          Object.keys(flight).length ?
            <FlightConfirmation flight={flight}/>
            : <div />
        }
      </Dialog>
    </div>
  );
};
