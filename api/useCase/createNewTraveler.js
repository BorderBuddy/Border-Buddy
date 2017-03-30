function flightDetailsSubmitted(travelerDetails) {
  return travelerDetails.flightNum && travelerDetails.airlineCode && travelerDetails.arrivalTime;
}
export default function createNewTraveler({repository, travelerDetails, callbacks, travelerNotifier}) {
  let findOrCreateFlight;

  if (flightDetailsSubmitted(travelerDetails)) {
    findOrCreateFlight = repository.flights.findOrCreate({
      where: {
        flightNum: travelerDetails.flightNum,
        airlineCode: travelerDetails.airlineCode,
        arrivalTime: travelerDetails.arrivalTime
      }
    });
  } else {
    findOrCreateFlight = Promise.resolve([{}]);
  }

  return findOrCreateFlight.then((flight) => {
    const travelerDetailsWithFlight = Object.assign({}, travelerDetails, {flightId: flight[0].id});
    if (!!travelerDetails.id) {
      return repository.travelers.update(travelerDetailsWithFlight, {where: {id: travelerDetailsWithFlight.id}});
    } else {
      return repository.travelers.create(travelerDetailsWithFlight);
    }
  }).then((traveler) => {
    callbacks.onSuccess(traveler);
    travelerNotifier.onRegistrationSuccess(traveler);
  });
}
