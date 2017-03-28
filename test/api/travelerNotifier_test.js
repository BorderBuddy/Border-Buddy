import { config } from '../../api/config';
import TravelerNotifier from '../../api/notify/travelerNotifier';
import '../unit_helpers';

describe('TravelerNotifier', () => {

  let client;
  let notifier;

  beforeEach(() => {
    client = { sendMessage: sinon.spy() };
    notifier = new TravelerNotifier({ client });
  });

  describe('.onRegistrationSuccess', () => {

    beforeEach(() => {
      notifier.onRegistrationSuccess({
        name: 'Traveler Name',
        phone: '5551231234',
      });
    });

    it('sends a notification to the traveler', () => {
      expect(client.sendMessage).to.have.been.calledWith({
        to: '5551231234',
        from: config.twilio.adminPhone,
        body: sinon.match('Thanks for registering with BorderBuddy, Traveler Name!')
      });
    });

  });
});
