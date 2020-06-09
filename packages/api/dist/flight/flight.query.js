"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleByCodeAndDate = exports.statusByCodeAndDate = exports.airlineByCode = void 0;
const appConfig_1 = __importDefault(require("../appConfig"));
const baseline = 'https://api.flightstats.com/flex';
const keys = `?appId=${appConfig_1.default.FLIGHT_STATS_ID}&appKey=${appConfig_1.default.FLIGHT_STATS_KEY}`;
exports.airlineByCode = code => baseline + `/airlines/rest/v1/json/iata/${code}` + keys;
exports.statusByCodeAndDate = (code, flightNum, year, month, day) => baseline + `/flightstatus/rest/v2/json/flight/status/${code}/${flightNum}/arr/${year}/${month}/${day}` + keys;
// only useful for flights in the past
exports.scheduleByCodeAndDate = (code, flightNum, year, month, day) => baseline + `/schedules/rest/v1/json/flight/${code}/${flightNum}/arriving/${year}/${month}/${day}` + keys;
//# sourceMappingURL=flight.query.js.map