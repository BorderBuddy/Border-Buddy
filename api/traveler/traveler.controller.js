import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';


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
    return traveler.setFlight(globalFlight)
  })
  .then(finalTraveler => { // does not include flight object
    res.status(201).json(finalTraveler)
  })
  .catch(next);
}

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
  return Traveler.findById(req.params.id)
  .then(traveler => traveler.update(req.body))
  .then(updatedTraveler => res.status(201).json(updatedTraveler))
  .catch(next);
}