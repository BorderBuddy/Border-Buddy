import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, FlatButton, RaisedButton } from 'material-ui';
import SignUp from '../components/SignUp';
import { signUp } from '../actions/signUp';


class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      flight: {},
      // values: {
      //   name: '',
      //   nationality: '',
      //   email: '',
      //   phone: '',
      //   connectivity: false,
      //   secondaryContact: '',
      //   arrivalTime: {},
      //   airlineCode: '',
      //   flightNum: ''
      // }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
  }

  handleClose() {
    this.setState({open: false});
  }

  confirmSubmit() {
    const { signUp } = this.props;
    console.log('Homepage props are ', this.props)
    // signUp(this.props.form.signUp.values);
  }

  handleSubmit(e) {
    e.preventDefault();
    // const { values } = this.props.form.signUp;
    this.setState({ open: true });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        onTouchTap={this.confirmSubmit}
      />
    ];



    return (
      <div>
        <SignUp handleSubmit={this.handleSubmit} handleFlightChange={this.handleFlightChange} />
        <Dialog
          title="Confirm Submission"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
        Please confirm your details below:
        </Dialog>
      </div>
    );
  }
}

/*---------------------------REDUX CONTAINER---------------------------*/

const mapStateToProps = ({form}) => ({form});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
