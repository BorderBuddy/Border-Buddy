import React, { useState, useEffect } from 'react'
import { SingleTraveler } from '../components/Admin/SingleTraveler'
import {Traveler} from '../models/models'
import { SendTextModal } from '../components/partials/SendTextModal'
import { DeleteTravelerConfirmation } from '../components/partials/DeleteTravelerConfirmation'
import { useHistory, useParams } from 'react-router-dom'
import api from '../api/api'

interface RouteParams {
  id: string
}
export const SingleTravelerContainer = () => {
  const history = useHistory()
  const params = useParams<RouteParams>()
  const [ sentTextOpen, setSentTextOpen ] = useState(false)
  const [ textSentSuccess, setTextSentSuccess ] = useState(false)
  const [ deleteTravelerOpen, setDeleteTravelerOpen ] = useState(false)
  const [ traveler, setTraveler ] = useState<Traveler | null>(null)
  const [ users, setUsers ] = useState([])
  const [ ready, setReady ] = useState(false)

  useEffect(() => {
    getTraveler()
    getAdmins()
  }, [])
  const getAdmins = async () => {
    try {
      const admins = await api.getUsers()
      // console.log(admins)
      setUsers(admins)
    } catch (err) {
      alert('Error getting users')
    }
  }
  const getTraveler = async () => {
    try {
      const selectedTraveler = await api.getTraveler(params.id)
      setTraveler(selectedTraveler)
      setReady(true)
    } catch (err) {
      alert('Error fetching traveler')
    }
  }
  const handleSentTextClose = () => {
    setSentTextOpen(false)
  }

  const handleDeleteTravelerClose = () => {
    setDeleteTravelerOpen(false)
  }

  const openDeleteTravelerModal = () => {
    setDeleteTravelerOpen(true)
  }

  const sendText = async (updatedTraveler: any) => {
    try {
      await api.sendText(updatedTraveler)
      setSentTextOpen(true)
      setTextSentSuccess(true)
    } catch (err) {
      setSentTextOpen(true)
      setTextSentSuccess(false)
      alert('Error sending text')
    }
  }

  const deleteTravelerConfirm = async () => {
    try {
      await api.deleteTraveler(params.id)
      handleDeleteTravelerClose()
      history.push('/admin/travelers')
    } catch (err) {
      alert('Error deleting traveler')
    }
  }
  if (ready) {
    console.log(traveler)
    return (
      <div>
        <SingleTraveler
          traveler={traveler}
          sendText={sendText}
          representatives={users}
          deleteTraveler={openDeleteTravelerModal}/>
        <SendTextModal open={sentTextOpen} handleClose={handleSentTextClose} success={textSentSuccess} />
        <DeleteTravelerConfirmation open={deleteTravelerOpen} handleClose={handleDeleteTravelerClose} traveler={traveler !== null ? traveler.name : ''} confirmDelete={deleteTravelerConfirm}/>
      </div>
    )
  } else return <div>loading...</div>
}

