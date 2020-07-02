import React, { Component } from 'react'
import Form from './Form'
import { reduxForm } from 'redux-form'
import { validateCode } from '../utils/validations'

class FormContainer extends Component {
  componentDidMount () {
    this.props.initialize()
  }

  render () {
    return <Form {...this.props} />
  }
}

export default reduxForm({
  form: 'travelerForm', // a unique identifier for this form
  asyncValidate: validateCode,
  asyncBlurFields: ['airlineCode']
})(FormContainer)
