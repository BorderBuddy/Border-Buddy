// Traveler model
import db from '../../database';
import Traveler from '../../database/models/travelers';
import Flight from '../../database/models/flights';
const Chalk = require('chalk');

// const fakeTraveler = {
//   name : "Tom",
//   phone : 1234567879,
//   nationality: 'something',
//   connectivity: true,
//   secondaryContact: 1234567894,
//   status: 'unconfirmed',
//   flightNum: "JE342"
// };


export function createNewTraveler(req, res) {

  console.log(Chalk.blue('create Traveler Route Hit!'));
 return Flight.findOne({
   flightNum : fakeTraveler.flightNum})
 .then(flight => {
   console.log("FLIGHT",flight);
   let flight_id = flight.id;
   return   Traveler.create({
       name : fakeTraveler.name,
       phone : fakeTraveler.phone,
       nationality : fakeTraveler.nationality,
       connectivity : fakeTraveler.connectivity,
       secondaryContact : fakeTraveler.secondaryContact,
       status : fakeTraveler.status,
       flight_id : fakeTraveler.flightid
     });
 })
  .then(createdTraveler => {
      let traveler = { traveler : createdTraveler };
      res.status(201).json(traveler);
      console.log(Chalk.green("Successfully Created Traveler"));

    })
  .catch(err => {
    console.log(Chalk.red("Create Unsuccessful"), err);
  });

}

export function getAllTraveler(req,res){
  return Traveler.findAll()
  .then(allTravelers => {
    res.status(200).json(allTravelers);
  }).catch(err => {
  console.log(err);
}
);



}
