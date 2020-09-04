import React, { Fragment, useState, useEffect } from 'react'
import { Field } from 'formik'
import { MenuItem, Grid, InputLabel } from '@material-ui/core'
import { Select } from 'formik-material-ui'
import { adminFormExtensionStyle } from '../styles'
import { User } from '../../models/models'
import api from '../../api/user'

export const AdminFormExtension = () => {
  const style = adminFormExtensionStyle
  const [reps, setReps] = useState([] as User[])

  useEffect(() => {
    getAdmins()
  }, [])

  const getAdmins = async () => {
    try {
      const admins = await api.getUsers()
      setReps(admins)
    } catch (err) {
      alert('Error getting users')
    }
  }

  const menuItems = (representatives: User[]) => {
    return (
      representatives &&
      representatives.map((rep: User, index: number) => {
        return (
          <MenuItem
            key={index}
            value={rep.id}
            className="traveler-assign-to-option"
          >
            {first3Chars(rep.email)}
          </MenuItem>
        )
      })
    )
  }
  const first3Chars = (text: any) => {
    return text.substring(0, 3).toUpperCase()
  }

  return (
    <Fragment>
      <h3>Additional Administrative Fields</h3>
      <p>
        <em>Additional fields for administrative purposes.</em>
      </p>
      <Grid container direction='row' alignItems='center' justify='space-around'>
        <Grid item xs={11} sm={3}>
          <InputLabel shrink htmlFor="flightStatus">Flight Status</InputLabel>
          <Field
            name="flightStatus"
            component={Select}
            style={style.input}
            inputProps={{
              id: 'flightStatus',
            }}
          >
            <MenuItem value={'scheduled'} >Scheduled</MenuItem>
            <MenuItem value={'delayed'} >Delayed</MenuItem>
            <MenuItem value={'arrived'} >Arrived</MenuItem>
          </Field>
        </Grid>
        <Grid item xs={11} sm={3}>
          <InputLabel shrink htmlFor="passengerStatus">Passenger Status</InputLabel>
          <Field
            name="passengerStatus"
            component={Select}
            style={style.input}
            inputProps={{
              id: 'passengerStatus',
            }}
          >
            <MenuItem value={'transit'} >In Transit</MenuItem>
            <MenuItem value={'unconfirmed'} >Unconfirmed</MenuItem>
            <MenuItem value={'detained'} >Detained</MenuItem>
            <MenuItem value={'at risk'} >At Risk</MenuItem>
            <MenuItem value={'cleared'} >Cleared</MenuItem>
          </Field>
        </Grid>
        <Grid item xs={11} sm={3}>
          <InputLabel shrink htmlFor="representative">Assign To</InputLabel>
          <Field
            name="representative"
            component={Select}
            style={style.input}
            inputProps={{
              id: 'representative',
            }}
          >
            {menuItems(reps)}
          </Field>
        </Grid>
      </Grid>
    </Fragment>
  )
}
