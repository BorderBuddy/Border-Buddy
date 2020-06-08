import React from 'react';
import {Dialog, RaisedButton} from 'material-ui';

export default ({ confirmDelete, handleClose, open, traveler }) => {
  
  const actions = [
    <RaisedButton
      key={1}
      id="confirm-delete"
      label="Yes, delete this traveler"
      onTouchTap={confirmDelete}
  		backgroundColor="#800000"
      labelColor="#FFFFFF"
      style={style.button}
      />,
    <RaisedButton
      key={2}
      id="cancel-delete"
      label="No, do not delete this traveler"
      onTouchTap={handleClose}
      primary={true}
      style={style.button}
      />
  ];

  return (
    <div>
      <Dialog
        id="delete-traveler-confirmation"
        open={open}
        actions={actions}
        modal={true}
        title={'Are you sure you want to delete this traveler?'}>
        {
          <h2>{traveler.name}</h2>
        }
      </Dialog>
    </div>
  )
}

const style = {
  button: {
    width: '50%'
  }
}