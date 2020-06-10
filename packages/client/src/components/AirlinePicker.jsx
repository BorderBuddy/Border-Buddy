import React from 'react';
import {TextField} from '@material-ui/core';

export default ({ input, label, style, hintStyle, underlineFocusStyle, errorStyle, type, meta: { asyncValidating, touched, error }}) => (
    <div className={asyncValidating ? 'async-validating' : ''}>
      <TextField
        {...input}
        type={type}
        hintText={label}
        style={style}
        hintStyle={hintStyle}
        underlineFocusStyle={underlineFocusStyle}
        errorStyle={errorStyle}
        errorText={touched && error && `${error}`} />
    </div>
);