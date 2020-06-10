import React from 'react';
import {Dialog, Button} from '@material-ui/core';

export default ({ open, success, handleClose }) => {
  const actions = [
    <Button 
      key={1}
      label="OK"
      variant='contained'
      color='primary'
      onClick={handleClose}
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