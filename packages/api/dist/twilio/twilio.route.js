"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_controller_1 = require("./twilio.controller");
const auth_service_1 = require("../auth/auth.service");
const base = '/api/twilio';
exports.default = (app) => {
    app.post(base + '/send', auth_service_1.protectedEndpoint(twilio_controller_1.sendText));
    app.post(base + '/verify', twilio_controller_1.respondToText);
    app.post(base + '/notifyAdminOfSignUp', twilio_controller_1.notifyAdminOfNewTravelerSignUp);
};
//# sourceMappingURL=twilio.route.js.map