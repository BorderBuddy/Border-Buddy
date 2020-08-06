import React from 'react'
import { SelectField } from 'redux-form-material-ui'
import { MenuItem } from '@material-ui/core'
import { Field } from 'redux-form'
import { adminFormExtensionStyle } from './styles'

export default (props) => {
  const menuItems = (representatives) => {
    return (
      representatives &&
      representatives.map((rep, index) => {
        return (
          <MenuItem
            key={index}
            value={rep.id}
            primaryText={first3Chars(rep.email)}
            className="traveler-assign-to-option"
          />
        )
      })
    )
  }

  const first3Chars = (text) => {
    return text.substring(0, 3).toUpperCase()
  }

  return (
    <div>
      <h3>Additional Administrative Fields</h3>
      <p>
        <em>Additional fields for administrative purposes.</em>
      </p>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="flightStatus"
          component={SelectField}
          hintText="Flight Status"
          style={adminFormExtensionStyle.input}
          errorStyle={adminFormExtensionStyle.error}
          hintStyle={adminFormExtensionStyle.label}
          underlineFocusStyle={adminFormExtensionStyle.underline}
          disabled={true}
        >
          <MenuItem value={'scheduled'} primaryText="Scheduled" />
          <MenuItem value={'delayed'} primaryText="Delayed" />
          <MenuItem value={'arrived'} primaryText="Arrived" />
        </Field>
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="passengerStatus"
          component={SelectField}
          hintText="Passenger Status"
          style={adminFormExtensionStyle.input}
          errorStyle={adminFormExtensionStyle.error}
          hintStyle={adminFormExtensionStyle.label}
          underlineFocusStyle={adminFormExtensionStyle.underline}
        >
          <MenuItem value={'transit'} primaryText="In Transit" />
          <MenuItem value={'unconfirmed'} primaryText="Unconfirmed" />
          <MenuItem value={'detained'} primaryText="Detained" />
          <MenuItem value={'at risk'} primaryText="At Risk" />
          <MenuItem value={'cleared'} primaryText="Cleared" />
        </Field>
      </div>
      <div className="field-container col-12 md-col md-col-6">
        <Field
          name="representative"
          component={SelectField}
          hintText="Assign To"
          style={adminFormExtensionStyle.input}
          errorStyle={adminFormExtensionStyle.error}
          hintStyle={adminFormExtensionStyle.label}
          underlineFocusStyle={adminFormExtensionStyle.underline}
          className="traveler-assign-to"
        >
          {menuItems(props.users)}
        </Field>
      </div>
    </div>
  )
}
