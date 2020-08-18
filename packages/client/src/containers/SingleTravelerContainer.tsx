import React, { useState, useEffect } from 'react'
import { Traveler } from '../components/Admin/SingleTraveler'
import { SendTextModal } from '../components/Admin/SendTextModal'
import { DeleteTravelerConfirmation } from '../components/Admin/DeleteTravelerConfirmation'
import { useHistory, useParams } from 'react-router-dom'
import api from '../api/api'

interface RouteParams {
  id: string
}

interface Traveler {
  name: string
  nationality: string
  requireInterpreter: boolean
  preferredLanguage: string
  email: string
  phone: string
  connectivity: boolean
  secondaryContactPhone: string
  secondaryContactName: string
  secondaryContactRelation: string
  status: object
  representative: object
  countryCode: string
  flight: object
}

export const SingleTravelerContainer = () => {
  const history = useHistory()
  const params = useParams<RouteParams>()
  const [ sentTextOpen, setSentTextOpen ] = useState(false)
  const [ textSentSuccess, setTextSentSuccess ] = useState(false)
  const [ deleteTravelerOpen, setDeleteTravelerOpen ] = useState(false)
  const [ traveler, setTraveler ] = useState<Traveler | null>(null)
  const [ users, setUsers ] = useState([])

  useEffect(() => {
    async () => {
      try {
        const selectedTraveler = await api.getTraveler(params.id)
        setTraveler(selectedTraveler)
      } catch (err) {
        alert('Error fetching traveler')
      }
    }
    async () => {
      try {
        const admins = await api.getUsers()
        setUsers(admins)
      } catch (err) {
        alert('Error getting users')
      }
    }
  }, [])

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

  return (
    <div>
      <Traveler
        traveler={traveler}
        sendText={sendText}
        representatives={users}
        deleteTraveler={openDeleteTravelerModal}/>
      <SendTextModal open={sentTextOpen} handleClose={handleSentTextClose} success={textSentSuccess} />
      <DeleteTravelerConfirmation open={deleteTravelerOpen} handleClose={handleDeleteTravelerClose} traveler={traveler !== null ? traveler.name : ''} confirmDelete={deleteTravelerConfirm}/>
    </div>
  )
}

