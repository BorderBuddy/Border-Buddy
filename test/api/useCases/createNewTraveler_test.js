import '../../unit_helpers';
import createOrUpdateTraveler from '../../../api/useCase/createOrUpdateTraveler';

describe('createOrUpdateTraveler', () => {

  let travelerNotifier;
  let flightDetails;
  let travelerDetails;
  let repository;
  let createdFlights;
  let createdTraveler;
  let callbacks;
  let findOrCreatePromise;
  let createTravelerPromise;

  beforeEach(() => {
    travelerDetails = {
      name: 'John Citizen',
      nationality: 'Nation',
      phone: '1234567890',
      email: 'jc@example.com',
      connectivity: true,
      secondaryContactName: 'Jane Citizen',
      secondaryContactRelation: 'Mother',
      secondaryContactPhone: '0987654321',
      requireInterpreter: true,
      preferredLanguage: 'Chinese',
    };
    flightDetails = {
      flightNum: '1234',
      airlineCode: 'TEST',
      arrivalTime: '1970-01-01'
    };

    repository = {
      flights: {findOrCreate: sinon.stub()},
      travelers: {create: sinon.stub()}
    };

    callbacks = {onSuccess: sinon.spy(), onFailure: sinon.spy()};
    travelerNotifier = {onRegistrationSuccess: sinon.spy()};
  });

  describe('always', () => {
    beforeEach(() => {
      createdTraveler = {a: 'traveler'};
      createTravelerPromise = Promise.resolve(createdTraveler);

      repository.flights.findOrCreate.returns(findOrCreatePromise);
      repository.travelers.create.returns(createTravelerPromise);
    });

    it('creates a traveler', () => {
      return createOrUpdateTraveler({repository, travelerDetails, callbacks, travelerNotifier}).then(() => {
        expect(repository.travelers.create.getCall(0).args[0]).to.containSubset({
          name: 'John Citizen',
          nationality: 'Nation',
          phone: '1234567890',
          email: 'jc@example.com',
          connectivity: true,
          requireInterpreter: true,
          preferredLanguage: 'Chinese',
          secondaryContactName: 'Jane Citizen',
          secondaryContactRelation: 'Mother',
          secondaryContactPhone: '0987654321'
        });
      });
    });

    describe('on success', () => {
      it('calls the onSuccess callback with the created traveler', () => {
        return createOrUpdateTraveler({repository, travelerDetails: travelerDetails, callbacks, travelerNotifier})
          .then(() => {
            expect(callbacks.onSuccess).to.have.been.calledWith(createdTraveler);
          });
      });

      it('notifies the traveler that they have been registered', () => {
        return createOrUpdateTraveler({repository, travelerDetails: travelerDetails, callbacks, travelerNotifier})
          .then(() => {
            expect(travelerNotifier.onRegistrationSuccess).to.have.been.calledWith(createdTraveler);
          });
      });
    });
  });

  describe('when flight information is submitted', () => {
    let travelerDetailsWithFlight;

    beforeEach(() => {
      travelerDetailsWithFlight = Object.assign({}, travelerDetails, flightDetails);

      createdTraveler = {a: 'traveler', flightId: 123};
      createTravelerPromise = Promise.resolve(createdTraveler);

      createdFlights = [{a: 'flight', id: 123}];
      findOrCreatePromise = Promise.resolve(createdFlights);

      repository.flights.findOrCreate.returns(findOrCreatePromise);
      repository.travelers.create.returns(createTravelerPromise);
    });

    it('assigns the flight to the traveler', () => {
      return createOrUpdateTraveler({repository, travelerDetails: travelerDetailsWithFlight, callbacks, travelerNotifier})
        .then(() => {
          expect(callbacks.onSuccess.getCall(0).args[0]).to.containSubset({flightId: 123});
        });
    });
  });
});
