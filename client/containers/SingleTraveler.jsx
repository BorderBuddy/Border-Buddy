import React, {Component} from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
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

  confirmSubmit() {
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
    this.props.updateTraveler(this.props.form.singleTraveler.values, this.props.routeParams.id);
    this.setState({open: true});
  }

	render() {
    const textModalOptions = [
      <FlatButton 
        label="OK"
        primary={true}
        onTouchTap={this.handleSentTextClose}
      />
    ]

		return (
    <div>
      <SingleTraveler 
        handleSubmit={this.handleSubmit} 
        changed={this.state.changed} 
        id={this.props.params.id}
        sendText={this.sendText}
      />
      <SignUpConfirmation open={this.state.open} flight={this.props.flight} handleClose={this.handleClose}/>
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

const mapStateToProps = ({ form, flight }) => ({ form, flight })

const mapDispatchToProps = dispatch => ({
  updateTraveler: (traveler, id) => dispatch(updateTraveler(traveler, id)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day)),
  sendText: (traveler) => dispatch(sendText(traveler))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleTravelerContainer);
