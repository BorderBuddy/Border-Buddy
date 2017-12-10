import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';

export default ({
  input,
  label,
  style,
  hintStyle,
  underlineFocusStyle,
  toggleTooltip,
  tooltipOpen,
  errorStyle,
  type,
  meta: { asyncValidating, touched, error }
}) => (
  <div className={asyncValidating ? 'async-validating' : ''}>
    <TextField
      {...input}
      type={type}
      hintText={label}
      style={style}
      hintStyle={hintStyle}
      underlineFocusStyle={underlineFocusStyle}
      errorStyle={errorStyle}
      errorText={touched && error && `${error}`}
    />
    <IconButton
      tooltipPosition="top-center"
      tooltip="Click me for more info!"
      touch={true}
      onClick={toggleTooltip}
    >
      <InfoIcon />
    </IconButton>
    {tooltipOpen && (
      <Paper style={{ width: '300px', padding: '10px' }}>
        {`Your airline's 2 letter code. For example American Airlines is AA. You can search for your code `}
        <a
          target="_blank"
          href="http://www.iata.org/publications/Pages/code-search.aspx"
        >
          here.
        </a>
      </Paper>
    )}
  </div>
);
