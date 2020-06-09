"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const flight_query_1 = require("../flight.query");
const mappers_1 = require("../../utils/mappers");
const getCode = (req, res, next) => {
    const { code } = req.query;
    return axios_1.default.get(flight_query_1.airlineByCode(code))
        .then(results => {
        const { airlines } = results.data;
        if (!airlines.length) {
            res.status(404).json('code not found');
        }
        else {
            const mappedAirlineInfo = mappers_1.airlineInfoMapper(airlines, code);
            res.status(200).json(mappedAirlineInfo);
        }
    })
        .catch(next);
};
const verifyFlight = (req, res, next) => {
    const { code, flightNum, year, month, day } = req.query;
    return axios_1.default.get(flight_query_1.scheduleByCodeAndDate(code, flightNum, year, month, day))
        .then(flight => {
        if (flight.data.error || !flight.data.scheduledFlights.length) {
            res.status(404).json('flight not found');
        }
        else {
            const mappedFlightInfo = mappers_1.flightInfoMapper(flight.data);
            res.status(200).json(mappedFlightInfo);
        }
    })
        .catch(next);
};
exports.default = { getCode, verifyFlight };
//# sourceMappingURL=flight.prod.js.map