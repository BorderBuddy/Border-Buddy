import { Traveler } from '../../database/models/travelers'
import { Flight } from '../../database/models/flights'
import '../../database/models/index'
import { expect } from 'chai'

describe('Model: Traveler', () => {
  beforeEach(() => {
    return Traveler.truncate().then(() => {
      return Promise.all([
        createTravelerWithFlight('Andrew G', new Date() - oneDay()),
        createTravelerWithFlight('Emily Ho', new Date()),
        createTravelerWithFlight('Dillon P', new Date() - 4 * oneDay())
      ])
    })
  })

  describe('orderByArrival', () => {
    it('returns list of travelers in order of arrival time', () => {
      return Traveler.orderByArrival().then(orderedTravelers => {
        expect(orderedTravelers[0].name).to.equal('Emily Ho')
        expect(orderedTravelers[1].name).to.equal('Andrew G')
        expect(orderedTravelers[2].name).to.equal('Dillon P')
      })
    })
  })

  function createTravelerWithFlight (travelerName, arrivalTime) {
    return Flight.create({
      flightNum: 1884,
      airlineCode: 'B6',
      status: 'scheduled',
      arrivalTime: arrivalTime
    }).then((flight) => {
      Traveler.create({
        name: travelerName,
        nationality: 'Human',
        email: 'emily@example.com',
        phone: 123456789,
        connectivity: true,
        secondaryContactPhone: 123456789,
        secondaryContactName: 'secondaryContactName',
        secondaryContactRelation: 'secondaryContactRelation',
        requireInterpreter: false,
        preferredLanguage: 'English',
        status: 'transit',
        flightId: flight.id
      })
    })
  }

  function oneDay () {
    return 24 * 60 * 60 * 1000
  }
})
