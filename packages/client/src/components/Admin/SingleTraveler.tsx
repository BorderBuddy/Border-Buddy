import React, { useEffect, useState } from 'react'
import { EditForm } from '../forms/AdminAddTravelerForm'
import api from '../../api/api'

export const Traveler = (props: any) => {
  const [traveler, setTraveler] = useState({})
  const [flightDate, setFlightDate] = useState<Date | null>(null)

  useEffect(() => {
    async () => {
      const res = await api.getTraveler(props.id)
      setTraveler(res)
      setFlightDate(res.flight.scheduledArrivalTime ? new Date(res.flight.scheduledArrivalTime) : null)
    }
  }, [])

  const initialValues = {
    ...traveler,
    flightDate,
    representatives: props.representatives,
  }
  return (
    <EditForm
      initialValues={initialValues}
      title={'Edit Traveler'}
      deleteTraveler={props.deleteTraveler}
      showAdditionalButtons={true}
    />
  )
}
// class SingleTraveler extends React.Component {
//   componentDidMount () {
//     this.props.fetchSelectedTraveler(this.props.id)
//   }

//   render () {
//     return (
//       <EditForm
//         {...this.props}
//         title={'Edit Traveler'}
//         showAdditionalButtons={true}
//       />
//     )
//   }
// }

// const mapStateToProps = ({ selectedTraveler }: any) => {
//   const {
//     name,
//     nationality,
//     requireInterpreter,
//     preferredLanguage,
//     email,
//     phone,
//     connectivity,
//     secondaryContactPhone,
//     secondaryContactName,
//     secondaryContactRelation,
//     status: passengerStatus,
//     representative,
//     countryCode,
//   } = selectedTraveler
//   const { airlineCode, flightNum, scheduledArrivalTime, status: flightStatus } =
//     selectedTraveler.flight || {}
//   const flightDate = scheduledArrivalTime ? new Date(scheduledArrivalTime) : null
//   return {
//     initialValues: {
//       name,
//       nationality,
//       requireInterpreter: String(requireInterpreter),
//       preferredLanguage,
//       email,
//       phone,
//       connectivity: String(connectivity),
//       secondaryContactPhone,
//       secondaryContactName,
//       secondaryContactRelation,
//       passengerStatus,
//       scheduledArrivalTime: flightDate,
//       airlineCode,
//       flightNum,
//       flightStatus,
//       representative,
//       countryCode: countryCodes[countryCode],
//     },
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SingleTraveler)
