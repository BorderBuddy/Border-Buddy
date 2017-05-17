import axios from 'axios';
import {Repository, Traveler} from '../../database/models';
import TravelerNotifier from '../notify/travelerNotifier';

import createOrUpdateTravelerUseCase from '../useCase/createOrUpdateTraveler';

export const createNewTraveler = (req, res, next) => {
  const travelerDetails = req.body;
  const travelerNotifier = new TravelerNotifier();

  createOrUpdateTravelerUseCase({
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

  createOrUpdateTravelerUseCase({
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

export function deleteOne(req, res, next) {
  console.log(req.params.id);
  return Traveler.destroy({ where: { id: req.params.id }})
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
}