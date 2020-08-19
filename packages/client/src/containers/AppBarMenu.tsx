import React, { useContext } from 'react'
import { RenderAppBar } from '../components/Admin/AppBar'
import { useHistory } from 'react-router-dom'
import api from '../api/api'
import { UserContext } from '../UserContext'
export const AppBarMenu = () => {
  const history = useHistory()
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
