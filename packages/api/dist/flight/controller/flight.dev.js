"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mappers_1 = require("../../utils/mappers");
const flights_1 = require("../../database/models/flights");
/*
* All data in this file is dummy test data either from the DB
* or from inline fixtures.
*
* This allows us to test flightstatus adjacent code in dev without
* prod API keys
*
* This file needs to stay in sync with the dummy data in database/seed.js
*/
const getCode = (req, res, next) => {
    const { code } = req.query;
    const acceptedCodes = [
        'UA',
        'KL'
    ];
    const acceptedRes = {
        airlines: [
            {
                fs: 'UA',
                iata: 'UA',
                icao: 'UAL',
                name: 'United Airlines',
                phoneNumber: '1-800-864-8331',
                active: true
            },
            {
                fs: 'KL',
                iata: 'KL',
                icao: 'KLM',
                name: 'KLM',
                phoneNumber: '1-800-447-4747',
                active: true
            }
        ]
    };
    if (acceptedCodes.includes(code)) {
        const mappedAirlineInfo = mappers_1.airlineInfoMapper(acceptedRes.airlines, code);
        res.status(200).json(mappedAirlineInfo);
    }
    else {
        res.status(404).json('code not found');
    }
};
const verifyFlight = (req, res, next) => {
    const { code, flightNum, year, month, day } = req.query;
    const maybeFlight = flights_1.Flight.findOne({
        where: {
            airlineCode: code,
            flightNum: flightNum
        }
    })
        .then(flight => {
        // TODO fetch values from DB tables
        const stubbedValues = {
            departureTimeLocal: new Date().toISOString(),
            departureTimeUtc: new Date().toISOString(),
            arrivalTimeLocal: new Date().toISOString(),
            arrivalTimeUtc: new Date().toISOString()
        };
        const dummyFlight = Object.assign({}, flight.dataValues, stubbedValues);
        res.status(200).json(dummyFlight);
    })
        .catch(next);
};
exports.default = { getCode, verifyFlight };
//# sourceMappingURL=flight.dev.js.map