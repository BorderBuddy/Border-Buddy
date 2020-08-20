import React, { useEffect, useState } from 'react'
import { EditForm } from '../forms/AdminAddTravelerForm'

export const Traveler = (props: any) => {
  const {
    name,
    nationality,
    requireInterpreter,
    preferredLanguage,
    email,
    phone,
    connectivity,
    secondaryContactPhone,
    secondaryContactName,
    secondaryContactRelation,
    status: passengerStatus,
    representative,
    countryCode,
  } = props.traveler
  const { airlineCode, flightNum, scheduledArrivalTime, status: flightStatus } = props.traveler.flight || {}
  const [flightDate, setFlightDate] = useState<Date | null>(null)

  useEffect(() => {
    const flight = scheduledArrivalTime ? new Date(scheduledArrivalTime) : null
    setFlightDate(flight)
  }, [])

  const initialValues = {
    name,
    nationality,
    requireInterpreter,
    preferredLanguage,
    email,
    phone,
    connectivity,
    secondaryContactPhone,
    secondaryContactName,
    secondaryContactRelation,
    passengerStatus,
    scheduledArrivalTime: flightDate,
    airlineCode,
    flightNum,
    flightStatus,
    representative,
    countryCode,
    flightDate,
  }

  return (
    <EditForm
      initialValues={initialValues}
      title={'Edit Traveler'}
      representatives={props.representatives}
      deleteTraveler={props.deleteTraveler}
      showAdditionalButtons={true}
      sendText={props.sendText}
    />
  )
}
