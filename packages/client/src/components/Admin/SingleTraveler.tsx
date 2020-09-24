import React, { useEffect, useState } from 'react'
import { EditForm } from '../forms/EditForm'

export const SingleTraveler = (props: any) => {
  // console.log(JSON.stringify(props))
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
    flight,
    status: passengerStatus,
    representative,
    countryCode,
    id,
  } = props.traveler

  const {
    airlineCode,
    flightNum,
    scheduledArrivalTime,
    status: flightStatus,
  } = flight

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
    status,
    scheduledArrivalTime,
    airlineCode,
    flightNum,
    flightStatus,
    representative,
    countryCode,
    passengerStatus,
    id,
  }

  return (
    <EditForm
      initialValues={initialValues}
      title={'Edit Traveler'}
      // representatives={props.representatives}
      deleteTraveler={props.deleteTraveler}
      showAdditionalButtons={true}
      sendText={props.sendText}
    />
  )
}
