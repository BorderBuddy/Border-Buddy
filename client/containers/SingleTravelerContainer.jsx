import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import SingleTraveler from '../components/Admin/SingleTraveler';
import {browserHistory} from 'react-router';
import { updateTraveler, sendText } from '../actions/selectedTraveler';
import { checkFlight } from '../actions/flight';
import SignUpConfirmation from "../components/SignUpConfirmation";


class SingleTravelerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      changed: false,
      open: false,
      sentTextOpen: false,
      textSentSuccess: null
		};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSentTextClose = this.handleSentTextClose.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
	}

  handleClose() {
    this.setState({open: false });
  }

  handleSentTextClose() {
    this.setState({ sentTextOpen: false });
  }

  confirmSubmit(e) {
    e.preventDefault()
    const { updateTraveler, routeParams } = this.props;
    const { values } = this.props.form.singleTraveler;
    updateTraveler(values, routeParams.id)
    .then(() => {
      browserHistory.push('/admin/travelers');
    })
  }

  sendText() {
    this.props.sendText(this.props.form.singleTraveler.values)
    .then(() => {
      this.setState({ sentTextOpen: true, textSentSuccess: true })
    })
    .catch(() => {
      this.setState({ sentTextOpen: true, textSentSuccess: false })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { flightNum, airlineCode, arrivalTime } = this.props.form.singleTraveler.values;
    const day = arrivalTime.getDate();
    const year = arrivalTime.getYear() + 1900;
    const month = arrivalTime.getMonth() + 1;
    this.props.checkFlight(airlineCode, flightNum, year, month, day)
    .then(() => {
      this.setState({ open: true });
    })
    .catch(() => {
      this.setState({ open: false })
    })
  }

	render() {
    const textModalOptions = [
      <FlatButton 
        label="OK"
        primary={true}
        onTouchTap={this.handleSentTextClose}
      />
    ];

		return (
    <div>
      <SingleTraveler 
        confirmSubmit={this.confirmSubmit}
        handleSubmit={this.handleSubmit} 
        changed={this.state.changed} 
        id={this.props.params.id}
        sendText={this.sendText}
        representatives={this.props.users}/>
      <SignUpConfirmation
        open={this.state.open} flight={this.props.flight} handleClose={this.handleClose} confirmSubmit={this.confirmSubmit} />
      <Dialog
        title="Texting Traveler..."
        actions={textModalOptions}
        modal={true}
        open={this.state.sentTextOpen}
      >
        {
          this.state.textSentSuccess ?
            <h4>Your text has been sent successfully.</h4>
            :
            <h4>There was a problem trying to send your text</h4>
        }
      </Dialog>
    </div>
    )
	}
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({ form, flight, users }) => ({ form, flight, users });

const mapDispatchToProps = dispatch => ({
  updateTraveler: (traveler, id) => dispatch(updateTraveler(traveler, id)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day)),
  sendText: (traveler) => dispatch(sendText(traveler))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTravelerContainer);
