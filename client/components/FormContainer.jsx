import React, { Component } from 'react';
import Form from './Form';
import { reduxForm } from 'redux-form';
import { validateCode } from '../utils/validations';

class FormContainer extends Component {
  constructor() {
    super();
    this.state = { tooltipOpen: false };
    this.toggleTooltip = this.toggleTooltip.bind(this);
  }

  componentDidMount() {
    this.props.initialize();
  }

  toggleTooltip() {
    console.log('yo');
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }

  render() {
    return (
      <Form
        {...this.props}
        {...this.state}
        toggleTooltip={this.toggleTooltip}
      />
    );
  }
}

export default reduxForm({
  form: 'travelerForm', // a unique identifier for this form
  asyncValidate: validateCode,
  asyncBlurFields: ['airlineCode']
})(FormContainer);
