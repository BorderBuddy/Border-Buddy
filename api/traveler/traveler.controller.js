import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';

import chalk from 'chalk';

import { Twilio } from '../twilio/twilio.controller';
import { config  } from '../config';


export const createNewTraveler = (req, res, next) => {
  const { flightNum, airlineCode, arrivalTime,
          name, nationality, phone, email, connectivity, secondaryContact  } = req.body;
  let globalFlight;
  return Flight.findOrCreate({where: {
    flightNum,
    airlineCode,
    arrivalTime
  }})
  .then(flight => {
    globalFlight = flight[0];
    return Traveler.create({
      name,
      nationality,
      phone,
      email,
      connectivity,
      secondaryContact
    });
  })
  .then(traveler => {
    return traveler.setFlight(globalFlight);
  })
  .then(finalTraveler => {
    res.status(201).json(finalTraveler);

    // not chaining as promise
    // in future, maybe confirm user phone num before persisting
    Twilio.sendMessage({
      to: finalTraveler.phone,
      from: config.twilio.adminPhone,
      body: `Thanks for registering with BorderBuddy, ${finalTraveler.name}! Safe travels, and text OK to this number when have passed through customs and immigration.`
    }, (err, result) => {
      if (err) console.error(chalk.red('ERROR SENDING CONFIRMATION TEXT', err));
      else return;
    });

  })
  .catch(next);
};

export function getAllTravelers(req, res, next) {
  return Traveler.findAll({ include: [{ all: true }] })
  .then(allTravelers => {
    res.status(200).json(allTravelers);
  })
  .catch(next);
}

export function getById(req, res, next) {
  return Traveler.findById(req.params.id, { include: [{ all: true }] })
  .then(traveler => {
    res.status(200).json(traveler);
  })
  .catch(next);
}

export function updateOne(req, res, next) {

  const { flightNum, airlineCode, arrivalTime, flightStatus,
          name, nationality, phone, email, connectivity, secondaryContact, passengerStatus  } = req.body;
  let globalFlight;
  return Flight.findOrCreate({ 
    where: {
      flightNum, airlineCode, arrivalTime
    }
  })
  .then(flight => {
    globalFlight = flight[0];
    return Traveler.findOne({
      include: [{ model: Flight }],
      where:{
       id: req.params.id
      }
    });
  })
  .then(traveler => {
    return traveler.update({
      name, nationality, phone, email, connectivity, secondaryContact, status: passengerStatus
    })
  })
  .then(updatedTraveler => {
    return updatedTraveler.setFlight(globalFlight);
  })
  .then(finalTraveler => res.status(201).json(finalTraveler))
  .catch(next);
}