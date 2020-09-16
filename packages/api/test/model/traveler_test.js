import { Traveler } from '../../src/database/models/travelers'
import { Flight } from '../../src/database/models/flights'
import '../../src/database/models/index'
import { expect } from 'chai'

describe('Model: Traveler', () => {
  beforeEach(() => {
    return new Promise((resolve, reject) => {
      Traveler.truncate().then(() => {
        resolve(Promise.all([
          createTravelerWithFlight('Andrew G', new Date() - oneDay(), 'transit'),
          createTravelerWithFlight('Emily Ho', new Date(), 'transit'),
          createTravelerWithFlight('Dillon P', new Date() - 4 * oneDay(), 'cleared'),
        ]))
      })
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

  describe('redactPersonalInfo', () => {
    it('redacts the personal info of a cleared traveler', () => {
      return Traveler.redactPersonalInfo().then(redactedTravelers => {
        expect(redactedTravelers[0].name).to.equal('XXXXX')
        expect(redactedTravelers[0].phone).to.equal('XXXXX')
        expect(redactedTravelers[0].email).to.equal('XXXXX')
        expect(redactedTravelers[0].secondaryContactName).to.equal('XXXXX')
        expect(redactedTravelers[0].secondaryContactPhone).to.equal('XXXXX')
        expect(redactedTravelers[0].secondaryContactRelation).to.equal('XXXXX')
      })
    })
  })
})

function createTravelerWithFlight (travelerName, scheduledArrivalTime, status) {
  return Flight.create({
    flightNum: 1884,
    airlineCode: 'B6',
    status: 'scheduled',
    scheduledArrivalTime: scheduledArrivalTime,
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
      status: status,
      flightId: flight.id,
    })
  })
}

function oneDay () {
  return 24 * 60 * 60 * 1000
}
