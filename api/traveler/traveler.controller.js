import {Repository, Traveler, Flight} from '../../database/models';
import TravelerNotifier from '../notify/travelerNotifier';

import createNewTravelerUseCase from '../useCase/createNewTraveler';

export const createNewTraveler = (req, res, next) => {
  const travelerDetails = req.body;
  const travelerNotifier = new TravelerNotifier();

  createNewTravelerUseCase({
    repository: Repository,
    travelerDetails,
    callbacks: {
      onSuccess: (traveler) => res.status(201).json(traveler)
    },
    travelerNotifier
  })
    .catch(next);
};

export function getAllTravelers(req, res, next) {
  return Traveler.findAll({include: [{all: true}]})
    .then(allTravelers => {
      res.status(200).json(allTravelers);
    })
    .catch(next);
}

export function getById(req, res, next) {
  return Traveler.findById(req.params.id, {include: [{all: true}]})
    .then(traveler => {
      res.status(200).json(traveler);
    })
    .catch(next);
}

export function updateOne(req, res, next) {

  const {
    flightNum, airlineCode, arrivalTime,
    name, nationality, phone, email, connectivity, secondaryContact, passengerStatus
  } = req.body;
  let globalFlight;
  return Flight.findOrCreate({
    where: {
      flightNum, airlineCode, arrivalTime
    }
  })
    .then(flight => {
      globalFlight = flight[0];
      return Traveler.findOne({
        include: [{model: Flight}],
        where: {
          id: req.params.id
        }
      });
    })
    .then(traveler => {
      return traveler.update({
        name, nationality, phone, email, connectivity, secondaryContact, status: passengerStatus
      });
    })
    .then(updatedTraveler => {
      return updatedTraveler.setFlight(globalFlight);
    })
    .then(finalTraveler => res.status(201).json(finalTraveler))
    .catch(next);
}
