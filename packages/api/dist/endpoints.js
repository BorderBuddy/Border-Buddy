"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRoutes = void 0;
const user_route_1 = __importDefault(require("./user/user.route"));
const traveler_route_1 = __importDefault(require("./traveler/traveler.route"));
const auth_route_1 = __importDefault(require("./auth/auth.route"));
const twilio_route_1 = __importDefault(require("./twilio/twilio.route"));
const flight_route_1 = __importDefault(require("./flight/flight.route"));
const routes = [
    user_route_1.default,
    auth_route_1.default,
    traveler_route_1.default,
    twilio_route_1.default,
    flight_route_1.default
];
function addRoutes(app) {
    routes.forEach((route) => route(app));
}
exports.addRoutes = addRoutes;
//# sourceMappingURL=endpoints.js.map