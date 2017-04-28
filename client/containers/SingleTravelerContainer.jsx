import React, {Component} from 'react';
import { connect } from 'react-redux';
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import SingleTraveler from '../components/Admin/SingleTraveler';
import {browserHistory} from 'react-router';
import { updateTraveler, sendText, deleteTraveler } from '../actions/selectedTraveler';
import { checkFlight } from '../actions/flight';
import SignUpConfirmation from "../components/SignUpConfirmation";
import SendTextModal from '../components/Admin/SendTextModal';
import DeleteTravelerConfirmation from '../components/Admin/DeleteTravelerConfirmation';


class SingleTravelerContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
      changed: false,
      open: false,
      sentTextOpen: false,
      textSentSuccess: null,
      deleteTravelerOpen: false
		};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSentTextClose = this.handleSentTextClose.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
    this.sendText = this.sendText.bind(this);
    this.deleteTravelerConfirm = this.deleteTravelerConfirm.bind(this);
    this.handleDeleteTravelerClose = this.handleDeleteTravelerClose.bind(this);
    this.openDeleteTravelerModal = this.openDeleteTravelerModal.bind(this);
	}

  handleClose() {
    this.setState({open: false });
  }

  handleSentTextClose() {
    this.setState({ sentTextOpen: false });
  }

  handleDeleteTravelerClose() {
    this.setState({ deleteTravelerOpen: false })
  }

  openDeleteTravelerModal() {
    this.setState({ deleteTravelerOpen: true })
  }

  confirmSubmit(e) {
    e.preventDefault()
    if (!this.props.flight) browserHistory.push('/admin/travelers');
    else {
      const { updateTraveler, routeParams } = this.props;
      const { values } = this.props.form.singleTraveler;
      updateTraveler(values, routeParams.id)
      .then(() => {
        browserHistory.push('/admin/travelers');
      })
    }
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

  deleteTravelerConfirm(e) {
    e.preventDefault()
    const { deleteTraveler, routeParams } = this.props;
    deleteTraveler(routeParams.id)
    .then(() => {
      this.handleDeleteTravelerClose();
      browserHistory.push('/admin/travelers');
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

		return (
    <div>
      <SingleTraveler 
        confirmSubmit={this.confirmSubmit}
        handleSubmit={this.handleSubmit} 
        changed={this.state.changed} 
        id={this.props.params.id}
        sendText={this.sendText}
        representatives={this.props.users}
        deleteTraveler={this.openDeleteTravelerModal}/>
      <SignUpConfirmation open={this.state.open} handleClose={this.handleClose} flight={this.props.flight} confirmSubmit={this.confirmSubmit} />
      <SendTextModal open={this.state.sentTextOpen} handleClose={this.handleSentTextClose} success={this.state.textSentSuccess} />
      <DeleteTravelerConfirmation open={this.state.deleteTravelerOpen} handleClose={this.handleDeleteTravelerClose} traveler={this.props.selectedTraveler} confirmDelete={this.deleteTravelerConfirm}/>
    </div>
    )
	}
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({ form, flight, users, selectedTraveler }) => ({ form, flight, users, selectedTraveler });

const mapDispatchToProps = dispatch => ({
  updateTraveler: (traveler, id) => dispatch(updateTraveler(traveler, id)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day)),
  sendText: (traveler) => dispatch(sendText(traveler)),
  deleteTraveler: (id) => dispatch(deleteTraveler(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleTravelerContainer);
