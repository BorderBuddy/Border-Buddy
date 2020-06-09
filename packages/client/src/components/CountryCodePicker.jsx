import React from 'react';
import { AutoComplete, MenuItem } from '@material-ui/core';
import countryCodes from '../utils/countryCodes'

const CountryCodePicker = ({ input, label, style, floatingLabelStyle, underlineFocusStyle, errorStyle, meta: { touched, error }}) => {
  
  const data = countryCodes.map(country => ({
    nameAndCode: `${country.name} - ${country.dial_code}`,
    code: country.value
  }))

  const dataSourceConfig = {
    text: 'nameAndCode',
    value: 'code'
  };
  return (
    <AutoComplete
      {...input}
      searchText={input.value}
      floatingLabelText={label}
      floatingLabelStyle={floatingLabelStyle}
      underlineFocusStyle={underlineFocusStyle}
      errorStyle={errorStyle}
      errorText={touched && error && `${error}`}
      style={style}
      filter={AutoComplete.caseInsensitiveFilter}
      openOnFocus={true}
      dataSource={data}
      dataSourceConfig={dataSourceConfig}
      name="countryCode"
    />  
  )
}

export default CountryCodePicker;