import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Tooltip, withStyles } from '@material-ui/core'

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip)

export const LoginButton = () => {
  const history = useHistory()

  return (
    <LightTooltip title="new travelers should use the register form">
      <Button
        style={styles.button}
        variant='text'
        onClick={() => history.push('/login')}
      >
        Login
      </Button>
    </LightTooltip>
  )
}

const styles = {
  button: {
    margin: '2em auto',
    display: 'block',
    width: '50%',
    color: 'white',
  },
}
