import './unit_helpers';
import createNewTraveler from '../../useCase/createNewTraveler';

describe('createNewTraveler', () => {

  let travelerNotifier;
  let travelerWithFlight;
  let travelerDetails;
  let repository;
  let createdFlights;
  let createdTraveler;
  let callbacks;

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
      flightNum: '1234',
      airlineCode: 'TEST',
      arrivalTime: '1970-01-01'
    };
    repository = {
      flights: {findOrCreate: sinon.stub()},
      travelers: {create: sinon.stub()}
    };

    createdFlights = [{a: 'flight'}];
    repository.flights.findOrCreate.returns(createdFlights);

    createdTraveler = {a: 'traveler', setFlight: sinon.stub()};
    repository.travelers.create.returns(createdTraveler);

    travelerWithFlight = {a: 'traveler-with-flight'};
    createdTraveler.setFlight.returns(travelerWithFlight);

    callbacks = {onSuccess: sinon.spy(), onFailure: sinon.spy()};
    travelerNotifier = {onRegistrationSuccess: sinon.spy()};

    return createNewTraveler({repository, travelerDetails, callbacks, travelerNotifier});
  });

  it('finds or creates a flight', () => {
    expect(repository.flights.findOrCreate).to.have.been.calledWith({
      where: {
        flightNum: '1234',
        airlineCode: 'TEST',
        arrivalTime: '1970-01-01'
      }
    });
  });

  it('creates a traveler', () => {
    expect(repository.travelers.create).to.have.been.calledWith({
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

  it('assigns the flight to the traveler', () => {
    expect(createdTraveler.setFlight).to.have.been.calledWith(createdFlights[0]);
  });

  describe('on success', () => {

    it('calls the onSuccess callback with the traveler', () => {
      expect(callbacks.onSuccess).to.have.been.calledWith(travelerWithFlight);
    });

    it('notifies the traveler that they have been registered', () => {
      expect(travelerNotifier.onRegistrationSuccess).to.have.been.calledWith(travelerWithFlight);
    });

  });


});
