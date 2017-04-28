import React from 'react';
import {Dialog, FlatButton} from 'material-ui';

export default ({ open, success, handleClose }) => {
  const actions = [
    <FlatButton 
      key={1}
      label="OK"
      primary={true}
      onTouchTap={handleClose}
    />
  ];

  return (
    <div>
      <Dialog
        title="Texting Traveler..."
        actions={actions}
        modal={true}
        open={open}
      >
        {
          success ?
            <h4>Your text has been sent successfully.</h4>
            :
            <h4>There was a problem trying to send your text</h4>
        }
      </Dialog>
    </div>
  )
}