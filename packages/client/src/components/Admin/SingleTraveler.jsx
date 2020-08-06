import React from 'react'
import { connect } from 'react-redux'
import { fetchSelectedTraveler } from '../../actions/selectedTraveler'
import countryCodes from '../../utils/countryCodes'
import { EditForm } from './AdminAddTravelerForm'

class SingleTraveler extends React.Component {
  componentDidMount () {
    this.props.fetchSelectedTraveler(this.props.id)
  }

  render () {
    return (
      <EditForm
        {...this.props}
        title={'Edit Traveler'}
        showAdditionalButtons={true}
      />
    )
  }
}

const mapStateToProps = ({ selectedTraveler }) => {
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
  } = selectedTraveler
  const { airlineCode, flightNum, scheduledArrivalTime, status: flightStatus } =
    selectedTraveler.flight || {}
  const flightDate = scheduledArrivalTime ? new Date(scheduledArrivalTime) : null
  return {
    initialValues: {
      name,
      nationality,
      requireInterpreter: String(requireInterpreter),
      preferredLanguage,
      email,
      phone,
      connectivity: String(connectivity),
      secondaryContactPhone,
      secondaryContactName,
      secondaryContactRelation,
      passengerStatus,
      scheduledArrivalTime: flightDate,
      airlineCode,
      flightNum,
      flightStatus,
      representative,
      countryCode: countryCodes[countryCode],
    },
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSelectedTraveler: (id) => dispatch(fetchSelectedTraveler(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTraveler)
