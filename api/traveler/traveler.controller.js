import {Repository, Traveler} from '../../database/models';
import TravelerNotifier from '../notify/travelerNotifier';

import createNewTravelerUseCase from '../useCase/createNewTraveler';

export const createNewTraveler = (req, res, next) => {
  const travelerDetails = req.body;
  const travelerNotifier = new TravelerNotifier();

  createNewTravelerUseCase({
    repository: Repository,
    travelerDetails,
    callbacks: {
      onSuccess: (traveler) => {
        res.status(201).json(traveler)
      }
    },
    travelerNotifier
  })
    .catch(next);
};

export function getAllTravelers(req, res, next) {
  return Traveler.orderByArrival()
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
  let travelerDetails = req.body;
  travelerDetails.id = req.params.id;
  travelerDetails.connectivity = (travelerDetails.connectivity == "true");
  travelerDetails.requireInterpreter = (travelerDetails.requireInterpreter == "true");

  createNewTravelerUseCase({
    repository: Repository,
    travelerDetails,
    callbacks: {
      onSuccess: (traveler) => {
        res.status(201).json(traveler)
      }
    }
  })
    .catch(next);
};
