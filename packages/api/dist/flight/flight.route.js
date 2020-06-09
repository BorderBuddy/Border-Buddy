"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flight_1 = __importDefault(require("./controller/flight"));
const base = '/api/flight';
exports.default = app => {
    app.get(base + '/verify', flight_1.default.verifyFlight);
    app.get(base + '/code', flight_1.default.getCode);
};
//# sourceMappingURL=flight.route.js.map