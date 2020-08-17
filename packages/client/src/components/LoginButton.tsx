import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

export const LoginButton = () => {
  const history = useHistory()

  return (
    <Button
      style={styles.button}
      variant='text'
      onClick={() => history.push('/login')}
    >
        Login
    </Button>
  )
}

const styles = {
  button: {
    backgroundColor: '#2d6ea8',
    margin: '2em auto',
    display: 'block',
    width: '50%',
    color: 'white',
  },
}
