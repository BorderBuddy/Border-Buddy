import React from 'react';
import { Dialog, FlatButton } from 'material-ui'
import FlightConfirmation from './FlightConfirmation'

export default class SignUpConfirmation extends React.Component {
  render() {
    const actions = [
      <FlatButton
        id='dismiss-confirmation'
        label="OK"
        primary={true}
        onTouchTap={this.props.handleClose}
      />
    ];

    return (
      <div>
        <Dialog
          id='sign-up-confirmation'
          open={this.props.open}
          actions={actions}
          modal={true}
          title={'Traveler submitted'}>
          {
            Object.keys(this.props.flight).length ?
            <FlightConfirmation flight={this.props.flight}/>
            : <div></div>
          }
        </Dialog>
      </div>
    )
  }
}

SignUpConfirmation.propTypes = {
  open: React.PropTypes.bool.isRequired,
  flight: React.PropTypes.object.isRequired,
  handleClose: React.PropTypes.func.isRequired
};


