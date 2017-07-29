import React from 'react';
import {reduxForm, Field} from 'redux-form';
import {RaisedButton, MenuItem} from 'material-ui';
import {TextField, DatePicker, SelectField, AutoComplete} from 'redux-form-material-ui';
import AirlinePicker from './AirlinePicker';
import CountryCodePicker from './CountryCodePicker';
import Form from './Form';
import {required, phone, email, validateCode, uppercase} from '../utils/validations';

const SignUp = (props) => {

  return (
    <Form {...props} />
  );
};