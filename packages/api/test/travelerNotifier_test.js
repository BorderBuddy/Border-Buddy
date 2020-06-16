import { config } from '../src/config'
import TravelerNotifier from '../src/notify/travelerNotifier'
import './unit_helpers'

describe('TravelerNotifier', () => {
  let client
  let notifier

  beforeEach(() => {
    client = { messages: { create: sinon.spy() } }
    notifier = new TravelerNotifier({ client })
  })

  describe('.onRegistrationSuccess', () => {
    beforeEach(() => {
      notifier.onRegistrationSuccess({
        name: 'Traveler Name',
        phone: '5551231234'
      })
    })

    it('sends a notification to the traveler', () => {
      expect(client.messages.create).to.have.been.calledWith({
        to: '5551231234',
        from: config.twilio.adminPhone,
        body: sinon.match('Thanks for registering with BorderBuddy, Traveler Name!')
      })
    })
  })
})
