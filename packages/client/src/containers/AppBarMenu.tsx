import React from 'react'
import { RenderAppBar } from '../components/partials/AppBar'
import api from '../api/api'
import { useHistory } from 'react-router-dom'

const history = useHistory()

export const AppBarMenu = (props :any, signout: any) => {
  const onSignoutClick = async () => {
    try {
      await api.logout()
      signout()
      history.push('/')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <RenderAppBar onSignoutClick={onSignoutClick}/>
  )
}

