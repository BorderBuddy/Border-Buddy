export default function createNewTraveler({repository, travelerDetails, callbacks, travelerNotifier}) {
  const findOrCreateFlight = repository.flights.findOrCreate({
    where: {
      flightNum: travelerDetails.flightNum,
      airlineCode: travelerDetails.airlineCode,
      arrivalTime: travelerDetails.arrivalTime
    }
  });
  const createTraveler = repository.travelers.create({
    name: travelerDetails.name,
    nationality: travelerDetails.nationality,
    phone: travelerDetails.phone,
    email: travelerDetails.email,
    connectivity: travelerDetails.connectivity,
    secondaryContactName: travelerDetails.secondaryContactName,
    secondaryContactRelation: travelerDetails.secondaryContactRelation,
    secondaryContactPhone: travelerDetails.secondaryContactPhone,
    requireInterpreter: travelerDetails.requireInterpreter,
    preferredLanguage: travelerDetails.preferredLanguage
  });

  return Promise.all([findOrCreateFlight, createTraveler]).then((results) => {
    const flights = results[0];
    const traveler = results[1];

    return traveler.setFlight(flights[0]);
  }).then(finalTraveler => {
    callbacks.onSuccess(finalTraveler);
    travelerNotifier.onRegistrationSuccess(finalTraveler);
  });
}
