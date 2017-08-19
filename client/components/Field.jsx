import React from 'react';
import {Field} from 'redux-form';
import {required, phone, email, validateCode, uppercase} from '../utils/validations';
import {formStyle} from './Admin/styles';

const StyledField = (props) => {
  if (props.name === 'arrivalTime') console.log(props);
  return (
    <Field
      name={props.name}
      className={`traveler-${name}`}
      hintStyle={formStyle.label}
      underlineFocusStyle={formStyle.underline}
      errorStyle={formStyle.error}
      style={formStyle.input}
      validate={props.validate}
      hintText={props.hintText}
      component={props.component}
      validate={props.validate}
      {...props}
    />
  )
}

export default StyledField;