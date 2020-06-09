"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flightDetailsSubmitted(travelerDetails) {
    return travelerDetails.flightNum && travelerDetails.airlineCode && travelerDetails.arrivalTime;
}
function shouldSendTextMessage(traveler, travelNotifier) {
    return traveler.phone && travelNotifier;
}
function createOrUpdateTraveler({ repository, travelerDetails, callbacks, travelerNotifier }) {
    let findOrCreateFlight;
    if (flightDetailsSubmitted(travelerDetails)) {
        findOrCreateFlight = repository.flights.findOrCreate({
            where: {
                flightNum: travelerDetails.flightNum,
                airlineCode: travelerDetails.airlineCode,
                arrivalTime: travelerDetails.arrivalTime
            }
        });
    }
    else {
        findOrCreateFlight = Promise.resolve([{}]);
    }
    return findOrCreateFlight.then((flight) => {
        const travelerDetailsWithFlight = Object.assign({}, travelerDetails, { flightId: flight[0].id });
        travelerDetailsWithFlight.status = travelerDetailsWithFlight.passengerStatus; // FIX THIS LATER! DO A MIGRATION TO FIX IT
        if (travelerDetails.id) {
            return repository.travelers.update(travelerDetailsWithFlight, { where: { id: travelerDetailsWithFlight.id } });
        }
        else {
            return repository.travelers.create(travelerDetailsWithFlight);
        }
    }).then((traveler) => {
        if (shouldSendTextMessage(traveler, travelerNotifier)) {
            travelerNotifier.onRegistrationSuccess(traveler);
        }
        return callbacks.onSuccess(traveler);
    });
}
exports.default = createOrUpdateTraveler;
//# sourceMappingURL=createOrUpdateTraveler.js.map