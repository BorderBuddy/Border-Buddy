import React, { useContext } from 'react'
import { RenderAppBar } from '../components/partials/AppBar'
import api from '../api/api'
import { UserContext } from '../UserContext'

export const AppBarMenu = () => {
  const {setCurrUser} = useContext(UserContext)

  const onSignoutClick = async () => {
    try {
      await api.logout()
      setCurrUser(undefined)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <RenderAppBar onSignoutClick={onSignoutClick}/>
  )
}
