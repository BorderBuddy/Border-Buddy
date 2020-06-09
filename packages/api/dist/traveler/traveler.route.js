"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const traveler_controller_1 = require("./traveler.controller");
const auth_service_1 = require("../auth/auth.service");
const base = '/api/traveler';
exports.default = app => {
    app.post(base + '/', traveler_controller_1.createNewTraveler);
    app.get(base + '/', auth_service_1.protectedEndpoint(traveler_controller_1.getAllTravelers));
    app.get(base + '/:id', auth_service_1.protectedEndpoint(traveler_controller_1.getById));
    app.put(base + '/:id', auth_service_1.protectedEndpoint(traveler_controller_1.updateOne));
    app.delete(base + '/:id', auth_service_1.protectedEndpoint(traveler_controller_1.deleteOne));
};
//# sourceMappingURL=traveler.route.js.map