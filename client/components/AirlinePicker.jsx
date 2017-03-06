import React from 'react';
import TextField from 'material-ui/TextField';

export default ({ input, label, style, floatingLabelStyle, underlineFocusStyle, errorStyle, type, meta: { asyncValidating, touched, error }}) => (
    <div className={asyncValidating ? 'async-validating' : ''}>
      <TextField
        {...input}
        type={type}
        floatingLabelText={label}
        style={style}
        floatingLabelStyle={floatingLabelStyle}
        underlineFocusStyle={underlineFocusStyle}
        errorStyle={errorStyle}
        errorText={touched && error && `${error}`} />
    </div>
);